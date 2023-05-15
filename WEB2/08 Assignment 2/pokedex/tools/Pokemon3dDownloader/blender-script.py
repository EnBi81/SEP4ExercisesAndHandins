import bpy
import os

# Specify the directory containing the .fbx files
input_directory = "C:/Users/enbi8/Downloads/pokemon3d/fbx-corrected/"

# Specify the directory to save the exported .fbx files
output_directory = "C:/Users/enbi8/Downloads/pokemon3d/fbx-corrected-after-blender/"

# Get a list of all .fbx files in the input directory
fbx_files = [file for file in os.listdir(input_directory) if file.endswith(".fbx")]

# Iterate through each .fbx file
for fbx_file in fbx_files:
    # Construct the full path to the input file
    input_path = os.path.join(input_directory, fbx_file)
    
    # Import the .fbx file
    bpy.ops.import_scene.fbx(filepath=input_path)

    # Create a new collection for the imported objects
    imported_collection = bpy.data.collections.new(name="Imported")
    bpy.context.scene.collection.children.link(imported_collection)
    
    # Move the imported objects to the new collection
    for obj in bpy.context.selected_objects:
        imported_collection.objects.link(obj)
    
    # Construct the full path to the output file
    output_path = os.path.join(output_directory, fbx_file)
    
    # Export the imported objects to a new .fbx file
    bpy.ops.export_scene.fbx(
        filepath=output_path,
        use_selection=True,
        path_mode='COPY',
        embed_textures=True
    )
    
    # Remove the imported objects from the collection
    bpy.context.scene.collection.children.unlink(imported_collection)
    
    # Delete the imported objects
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_by_type(type='MESH')
    bpy.ops.object.delete()

    # Print a message indicating the export is complete
    print("Exported:", output_path)

print("Export process completed.")