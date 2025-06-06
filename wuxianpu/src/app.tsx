import HarmonySinging from './apps/harmony-singing'
import Wuxianpu from './apps/wuxianpu'
import { Router, RouteConfig } from './common/router/router'

export default function App() {
    const routes: RouteConfig[] = [
        {
            path: 'wuxianpu',
            element: <Wuxianpu />,
            label: '五线谱练习',
        },
        {
            path: 'harmony',
            element: <HarmonySinging />,
            label: '和声音程模唱练习',
        },
    ]

    return (
        <Router
            urlRouter={true}
            routes={routes}
            defaultRoute="wuxianpu"
            classNames={{
                navContainer: 'mb-5',
                contentContainer: 'px-4',
                contentColor: 'bg-custom-bg',
                navColor: 'bg-white',
            }}
        />
    )
}
