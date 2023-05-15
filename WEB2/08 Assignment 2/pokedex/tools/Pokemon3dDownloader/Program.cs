using AngleSharp.Html.Dom;
using AngleSharp.Html.Parser;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using System.Diagnostics;
using System.IO.Compression;
using System.Threading.Channels;
using OpenQA.Selenium.Support.UI;

namespace Pokemon3dDownloader
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string dir = "C:\\Users\\enbi8\\Downloads\\pokemon3d\\gltf";
            string moveTo = "C:\\Users\\enbi8\\Downloads\\pokemon3d\\gltf-publish";

            var allFiles = Directory.GetFiles(dir)
                .Select(f =>
                {
                    FileInfo info = new FileInfo(f);
                    string pokemonId = info.Name[..3];
                    if (pokemonId is ['0', '0', _]) pokemonId = pokemonId[2..];
                    else if (pokemonId is ['0', _, _]) pokemonId = pokemonId[1..];

                    return new
                    {
                        PokemonId = pokemonId,
                        FileName = info.Name,
                        EscapedFileName = info.Name.Replace("'", ""),
                    };
                })
                .DistinctBy(f => f.PokemonId)
                .Select(f =>
                {
                    File.Copy(Path.Join(dir, f.FileName), Path.Join(moveTo, f.EscapedFileName));
                    return f;
                })
                .Select(f => $"'{f.PokemonId}':'{f.EscapedFileName}',");

            string js = $$"""const models = { {{string.Join("", allFiles)}} }""";

            File.WriteAllText("models.js", js);

        }


        static async Task Main4(string[] args)
        {
            var client = new HttpClient();

            // Set up Selenium web driver
            IWebDriver driver = new ChromeDriver();  // Assuming you have ChromeDriver installed and in PATH

            var files = Directory.GetFiles("C:\\Users\\enbi8\\Downloads\\pokemon3d\\fbx-corrected-after-blender");
            
            foreach(var fbx in files)
            {
                var zipFileName = new FileInfo(fbx);

                string pokemonName = zipFileName.Name.Replace(".fbx", "");
                
                string downloadFileName = $"C:\\Users\\enbi8\\Downloads\\pokemon3d\\gltf\\{pokemonName}.gltf";

                if (File.Exists(downloadFileName))
                    continue;


                driver.Navigate().GoToUrl("https://products.groupdocs.app/conversion/fbx-to-gltf");


                


                await Console.Out.WriteLineAsync("Checking out " + pokemonName);

                // Locate the file upload input element
                IWebElement fileInput = driver.FindElement(By.Id("fileDropRef"));

                await Console.Out.WriteLineAsync("Uploading " + pokemonName + ".fbx");

                // Provide the file path to be uploaded
                fileInput.SendKeys(fbx);

                do
                {
                    // wait for the upload
                    await Task.Delay(5000);

                    try
                    {
                        IWebElement loadingSpinner = driver.FindElement(By.ClassName("loading-spinner"));
                    }
                    catch (Exception)
                    {
                        break;
                    }
                } while (true);

                

                // Submit the form or trigger the upload process
                IWebElement convertButton = driver.FindElement(By.CssSelector(".convertbtn button"));
                convertButton.Click();
                await Console.Out.WriteLineAsync("Converting " + pokemonName + ".fbx");

                int retries = 0;
                do
                {
                    // wait for the upload

                    await Task.Delay(5000);

                    try
                    {
                        IWebElement loadingSpinner = driver.FindElement(By.CssSelector("span.downloadbtn a"));
                        string downloadLink = loadingSpinner.GetAttribute("href");

                        await Console.Out.WriteLineAsync("Downloading " + pokemonName + ".gltf");

                        var stream = await client.GetStreamAsync(downloadLink);

                        var fs = File.Create(downloadFileName);
                        stream.CopyTo(fs);

                        stream.Close();
                        fs.Close();

                        break;
                    }
                    catch (Exception)
                    {
                        retries++;
                    }

                    if (retries >= 4)
                        break;
                } while (true);
                
            }


            

            // Wait for the upload to complete or perform any necessary assertions or validations

            // Close the browser
            driver.Quit();
        }


        static void Main2(string[] args)
        {
            string models = "C:\\Users\\enbi8\\Downloads\\pokemon3d\\download-models\\";
            string tempFolder = "C:\\Users\\enbi8\\Downloads\\pokemon3d\\fbx-old\\";

            // get all the models we downloaded previously
            var allFiles = Directory.GetFiles(models);

            foreach(var file in allFiles)
            {
                var zipFileName = new FileInfo(file);

                string pokemonName = zipFileName.Name.Replace(".zip", "");

                Console.WriteLine("Extracting " + pokemonName);

                // extract zip content
                using (ZipArchive archive = ZipFile.OpenRead(file))
                {
                    foreach (ZipArchiveEntry entry in archive.Entries)
                    {
                        var zipPath = Path.Combine(tempFolder, entry.FullName);
                        if (zipPath.EndsWith("/"))
                            continue;

                        FileInfo inf = new FileInfo(zipPath);
                        Directory.CreateDirectory(inf.DirectoryName);

                        if (File.Exists(inf.FullName))
                            continue;
                        
                        entry.ExtractToFile(inf.FullName);
                    }
                }


                // get all the fbx files

                var fbxFiles = Directory.GetFiles(tempFolder, "*.fbx", SearchOption.AllDirectories).ToList();
                fbxFiles.AddRange(Directory.GetFiles(tempFolder, "*.FBX", SearchOption.AllDirectories));

                fbxFiles = fbxFiles.Distinct().ToList();
                 
                Console.WriteLine($"Found {fbxFiles.Count} for " + pokemonName);

                int i = 1;
                // convert all the fbx files (unfortunately the fbx files are in an old format (6100), and we need 7100 
                // so that blender can take the next step).
                // for this, we will use the client version of the https://www.autodesk.com/developer-network/platform-technologies/fbx-converter-archives
                foreach (var fbxFile in fbxFiles)
                {
                    Process? fbxConverter = Process.Start(new ProcessStartInfo
                    {
                        FileName = "A:\\Program Files\\FBX Converter\\2013.3\\bin\\FbxConverter.exe",
                        WorkingDirectory = "C:\\Users\\enbi8\\Downloads\\pokemon3d",
                        CreateNoWindow = true,
                        Arguments = $"\"{fbxFile}\" \"C:\\Users\\enbi8\\Downloads\\pokemon3d\\fbx-corrected\\{pokemonName}-{i}.fbx\" /dffDBX /f201300 /e"
                    });

                    fbxConverter.WaitForExit();

                    i++;
                }


                // clean up the temporary files
                var tempFold = new DirectoryInfo(tempFolder);

                foreach (FileInfo fileTemp in tempFold.GetFiles())
                {
                    fileTemp.Delete();
                }
                foreach (DirectoryInfo dirTemp in tempFold.GetDirectories())
                {
                    dirTemp.Delete(true);
                }

                Console.WriteLine("Cleaned up " + pokemonName);
                Console.WriteLine();
            }
        }

        static async Task Main1(string[] args)
        {
            var client = new HttpClient();
            
            // we download all the models from this website
            var htmlSourceCode = client.GetStringAsync("https://www.models-resource.com/3ds/pokemonxy/").Result;
            var parser = new HtmlParser();
            
            var document = await parser.ParseDocumentAsync(htmlSourceCode);

            // retrieve all the download links from the page where all the models are listed (only the models' id's, so we
            // need to convert them to download url)
            var downloadLinks = document.QuerySelectorAll(".updatesheeticons > a")
                .Where(element =>
                {
                    var headerText = element.QuerySelector(".iconheadertext").TextContent;
                    return headerText.StartsWith("#");
                })
                .Select(element =>
                {
                    var linkToSite = element.GetAttribute("href");
                    var split = linkToSite.Split("/", StringSplitOptions.None);
                    
                    var id = split[split.Length - 2];

                    return new
                    {
                        FileName = element.QuerySelector(".iconheadertext").TextContent.Replace("#", ""),
                        DownloadLink = $"https://www.models-resource.com/download/{id}/"
                    };
                });

            var s = string.Join("\n", downloadLinks.Select(downloadLink => downloadLink.DownloadLink));
            await Console.Out.WriteLineAsync(s);
            
            // download each of the model into the downloads folder
            foreach(var downloadLink in downloadLinks)
            {
                string downloadFileName = "C:\\Users\\enbi8\\Downloads\\pokemon3d\\download-models\\" + downloadLink.FileName + ".zip";

                if (File.Exists(downloadFileName))
                    continue;

                await Console.Out.WriteLineAsync("Downloading " + downloadLink);

                // copy the zip folder into a local folder
                var stream = await client.GetStreamAsync(downloadLink.DownloadLink);

                var fs = File.Create(downloadFileName);
                stream.CopyTo(fs);

                stream.Close();
                fs.Close();

                await Console.Out.WriteLineAsync("Success!");
                await Console.Out.WriteLineAsync();
                
                // wait so we don't get flagged for some bullshit ddos
                await Task.Delay(500);
            }
        }
    }
}