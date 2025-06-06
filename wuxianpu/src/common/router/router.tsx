import { JSX, useState } from 'react'
import clsx from 'clsx'
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'

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
    urlRouter?: boolean // New flag to toggle between custom router and HashRouter
}

export function Router({
    routes,
    defaultRoute,
    onRouteChange,
    classNames = {
        navColor: 'bg-white',
        contentColor: 'bg-custom-bg',
    },
    urlRouter = false, // Default to false
}: RouterProps) {
    const [currentRoute, setCurrentRoute] = useState<string>(defaultRoute || '')

    const activeNavDecoratorStart = (
        <div
            className={clsx(
                'absolute w-3 h-3 -translate-x-full bottom-0 left-0',
                classNames.contentColor
            )}
        >
            <div
                className={clsx(
                    'w-full h-full rounded-ee-xl',
                    classNames.navColor
                )}
            ></div>
        </div>
    )
    const activeNavDecoratorEnd = (
        <div
            className={clsx(
                'absolute w-3 h-3 translate-x-full bottom-0 right-0',
                classNames.contentColor
            )}
        >
            <div
                className={clsx(
                    'w-full h-full rounded-es-xl',
                    classNames.navColor
                )}
            ></div>
        </div>
    )

    const handleRouteChange = (path: string) => {
        setCurrentRoute(path)
        onRouteChange?.(path)
    }

    const getCurrentPage = () => {
        if (!currentRoute) return null
        const route = routes.find((r) => r.path === currentRoute)
        return route ? route.element : null
    }

    if (urlRouter) {
        // Use React's HashRouter
        return (
            <HashRouter>
                <nav
                    className={clsx(
                        'pt-5 flex justify-center items-center',
                        classNames.navColor,
                        classNames.navContainer
                    )}
                >
                    {routes.map((route, idx) => (
                        <div
                            className={clsx(
                                'mt-2 px-1 py-1 flex flex-grow-0 relative cursor-pointer',
                                classNames.navItem
                            )}
                            key={idx}
                        >
                            <NavLink
                                to={route.path}
                                className={({ isActive }) =>
                                    clsx(
                                        'py-2 px-5 rounded-xl hover:z-10 active:bg-slate-500 hover:bg-slate-100 active:z-10',
                                        isActive
                                            ? clsx(
                                                  classNames.contentColor,
                                                  'rounded-ss-xl rounded-se-xl',
                                                  classNames.activeNavItem
                                              )
                                            : 'bg-transparent'
                                    )
                                }
                            >
                                {route.label}
                            </NavLink>
                        </div>
                    ))}
                </nav>
                <div
                    className={clsx(
                        classNames.contentColor,
                        'pt-10 flow-root',
                        classNames.contentContainer
                    )}
                >
                    <Routes>
                        <Route
                            key={-1}
                            path="*"
                            element={
                                routes.find((r) => r.path === defaultRoute)
                                    ?.element
                            }
                        />
                        {routes.map((route, idx) => (
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </div>
            </HashRouter>
        )
    }

    // Use the existing custom router
    return (
        <>
            <nav
                className={clsx(
                    'pt-5 flex justify-center items-center',
                    classNames.navColor,
                    classNames.navContainer
                )}
            >
                {routes.map((route, idx) => (
                    <div
                        className={clsx(
                            'mt-2 px-1 py-1 flex flex-grow-0 relative cursor-pointer',
                            currentRoute === route.path
                                ? clsx(
                                      classNames.contentColor,
                                      'rounded-ss-xl rounded-se-xl',
                                      classNames.activeNavItem
                                  )
                                : clsx('bg-transparent', classNames.navItem)
                        )}
                        key={idx}
                        onClick={() => handleRouteChange(route.path)}
                    >
                        {currentRoute === route.path && activeNavDecoratorStart}
                        <div
                            className={clsx(
                                'py-2 px-5 rounded-xl hover:z-10 active:bg-slate-500 hover:bg-slate-100 active:z-10'
                            )}
                        >
                            {route.label}
                        </div>
                        {currentRoute === route.path && activeNavDecoratorEnd}
                    </div>
                ))}
            </nav>
            <div
                className={clsx(
                    classNames.contentColor,
                    'pt-10 flow-root',
                    classNames.contentContainer
                )}
            >
                {getCurrentPage()}
            </div>
        </>
    )
}
