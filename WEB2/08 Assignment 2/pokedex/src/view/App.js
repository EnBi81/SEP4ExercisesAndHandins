import {Header} from "./header/header";
import {createHashRouter, Outlet, RouterProvider} from "react-router-dom";
import {AboutUs} from "./about-us/about-us";
import './App.css'
import {PokemonPage} from "./pokemon-page/pokemon-page";

export default function App(){

    const headerLayout = (
        <>
            <Header></Header>
            <div className={'main'}>
                <Outlet></Outlet>
            </div>
        </>
    );

    const router = createHashRouter([
        {
            //path: '/',
            element: headerLayout,
            children: [
                {
                    path: '/',
                    element: <PokemonPage></PokemonPage>
                },
                {
                    path: '/about',
                    element: <AboutUs></AboutUs>
                }
            ]
        },
    ]);

    return (
        <RouterProvider router={router}></RouterProvider>
    );
}