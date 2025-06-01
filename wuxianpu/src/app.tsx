import Wuxianpu from './apps/wuxianpu'
import { Router, RouteConfig } from './common/router/router'

export default function App() {
    const routes: RouteConfig[] = [
        {
            path: 'wuxianpu',
            element: <Wuxianpu />,
            label: '五线谱练习'
        }
    ]

    return (
        <Router
            routes={routes}
            defaultElement={<Wuxianpu />}
            classNames={{
                navContainer: 'mb-5',
                contentContainer: 'px-4',
                contentColor: 'bg-custom-bg',
                navColor: 'bg-white'
            }}
        />
    )
}
