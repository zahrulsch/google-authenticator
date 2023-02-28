import { ConfigProvider, theme, GlobalToken, ThemeConfig } from "antd"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom"
import Titlebar from "./window/Titlebar"
import styled from "styled-components"
import Home from "./views/Home"
import About from "./views/About"
import AddProfile from "./views/AddProfile"

const Layout = styled.div`
    display: flex;
    padding: 10px 10px;
    height: calc(100vh - 35px);
    overflow: auto;
    box-sizing: border-box;
    width: 100%;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const token: Partial<GlobalToken> = {
    fontSize: 12.8,
    colorInfo: "#cb2b83",
    colorPrimary: "#a02669",
    wireframe: true,
    borderRadius: 4
}

const components: ThemeConfig["components"] = {}

function App() {
    return (
        <ConfigProvider
            theme={{ algorithm: theme.darkAlgorithm, token, components }}
        >
            <Flex>
                <BrowserRouter>
                    <Titlebar style={{ height: "35px" }}></Titlebar>
                    <Layout>
                        <Routes>
                            <Route
                                path="/"
                                element={<Home />}
                            />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/addprofile"
                                element={<AddProfile />}
                            />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </Flex>
        </ConfigProvider>
    )
}

export default App
