import { JSX, ReactNode, useState } from 'react'
import clsx from 'clsx'

export interface RouteConfig {
    path: string
    element: JSX.Element
    label: string
}

interface RouterProps {
    routes: RouteConfig[]
    defaultRoute?: string
    onRouteChange?: (path: string) => void
    classNames?: {
        navContainer?: string
        navItem?: string
        activeNavItem?: string
        contentContainer?: string
        navColor: string
        contentColor: string
    }
}

export function Router({
    routes,
    defaultRoute,
    onRouteChange,
    classNames = {
        navColor: 'bg-white',
        contentColor: 'bg-custom-bg',
    },
}: RouterProps) {
    const [currentRoute, setCurrentRoute] = useState<string>(defaultRoute || '')

    const activeNavDecoratorStart = (
        <div className={clsx("absolute w-3 h-3 -translate-x-full bottom-0 left-0", classNames.contentColor)}>
            <div className={clsx("w-full h-full rounded-ee-xl", classNames.navColor)}></div>
        </div>
    )
    const activeNavDecoratorEnd = (
        <div className={clsx("absolute w-3 h-3 translate-x-full bottom-0 right-0", classNames.contentColor)}>
            <div className={clsx("w-full h-full rounded-es-xl", classNames.navColor)}></div>
        </div>
    )

    const handleRouteChange = (path: string) => {
        setCurrentRoute(path)
        onRouteChange?.(path)
    }

    const getCurrentPage = () => {
        if (!currentRoute) return null
        const route = routes.find(r => r.path === currentRoute)
        return route ? route.element : null
    }

    return (
        <>
            <nav className={clsx('pt-5 flex justify-center items-center', classNames.navColor, classNames.navContainer)}>
                {routes.map((route, idx) => (
                    <div
                        className={clsx(
                            'mt-2 px-1 py-1 flex flex-grow-0 relative cursor-pointer',
                            currentRoute === route.path
                                ? clsx(classNames.contentColor, 'rounded-ss-xl rounded-se-xl', classNames.activeNavItem)
                                : clsx('bg-transparent', classNames.navItem)
                        )}
                        key={idx}
                        onClick={() => handleRouteChange(route.path)}
                    >
                        {currentRoute === route.path && activeNavDecoratorStart}
                        <div className={clsx(
                            'py-2 px-5 rounded-xl hover:z-10 active:bg-slate-500 hover:bg-slate-100 active:z-10',
                        )}>
                            {route.label}
                        </div>
                        {currentRoute === route.path && activeNavDecoratorEnd}
                    </div>
                ))}
            </nav>
            <div className={clsx(classNames.contentColor, 'pt-10 flow-root', classNames.contentContainer)}>
                {getCurrentPage()}
            </div>
        </>
    )
} 