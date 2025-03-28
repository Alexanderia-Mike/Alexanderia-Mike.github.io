// import React, { Component } from 'react'
// import { ReactNode } from 'react'

// type NoteName =
//     | 'C'
//     | 'C#'
//     | 'D'
//     | 'D#'
//     | 'E'
//     | 'F'
//     | 'F#'
//     | 'G'
//     | 'G#'
//     | 'A'
//     | 'A#'
//     | 'B'

// export interface PianoKeyProps {
//     idx: number
//     note: NoteName
//     isCorrect: boolean
//     isPressed: boolean
//     children: ReactNode
//     grayed?: boolean
// }

// export class PianoKey extends Component<PianoKeyProps> {
//     static defaultProps: Pick<PianoKeyProps, 'grayed'> = {
//         grayed: false,
//     }

//     state = {
//         scrollTop: 0, // Current scroll position
//     }

//     private contentRef: React.RefObject<HTMLDivElement> = React.createRef()
//     private containerRef: React.RefObject<HTMLDivElement> = React.createRef()

//     // Handle scrolling
//     handleScroll = () => {
//         if (this.contentRef.current) {
//             this.setState({ scrollTop: this.contentRef.current.scrollTop })
//         }
//     }

//     // Handle thumb drag (for desktop/phone interaction)
//     handleThumbDrag = (
//         event:
//             | React.MouseEvent<HTMLDivElement>
//             | React.TouchEvent<HTMLDivElement>
//     ) => {
//         event.preventDefault()
//         const container = this.containerRef.current
//         const content = this.contentRef.current
//         if (!container || !content) return

//         const containerHeight = container.clientHeight
//         const contentHeight = content.scrollHeight
//         const maxScroll = contentHeight - containerHeight

//         const startY =
//             'touches' in event ? event.touches[0].clientY : event.clientY
//         const startScrollTop = content.scrollTop

//         const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
//             const clientY =
//                 'touches' in moveEvent
//                     ? (moveEvent as TouchEvent).touches[0].clientY
//                     : (moveEvent as MouseEvent).clientY
//             const deltaY = clientY - startY
//             const scrollRatio =
//                 maxScroll / (containerHeight - this.getThumbHeight())
//             const newScrollTop = Math.max(
//                 0,
//                 Math.min(maxScroll, startScrollTop + deltaY * scrollRatio)
//             )
//             content.scrollTop = newScrollTop
//             this.setState({ scrollTop: newScrollTop })
//         }

//         const upHandler = () => {
//             document.removeEventListener('mousemove', moveHandler)
//             document.removeEventListener('mouseup', upHandler)
//             document.removeEventListener('touchmove', moveHandler)
//             document.removeEventListener('touchend', upHandler)
//         }

//         document.addEventListener('mousemove', moveHandler)
//         document.addEventListener('mouseup', upHandler)
//         document.addEventListener('touchmove', moveHandler)
//         document.addEventListener('touchend', upHandler)
//     }

//     // Calculate thumb height based on content and container size
//     getThumbHeight = () => {
//         const container = this.containerRef.current
//         const content = this.contentRef.current
//         if (!container || !content) return 0

//         const containerHeight = container.clientHeight
//         const contentHeight = content.scrollHeight
//         const thumbRatio = containerHeight / contentHeight
//         return Math.max(20, containerHeight * thumbRatio) // Minimum height of 20px
//     }

//     // Calculate thumb position
//     getThumbPosition = () => {
//         const container = this.containerRef.current
//         const content = this.contentRef.current
//         if (!container || !content) return 0

//         const containerHeight = container.clientHeight
//         const contentHeight = content.scrollHeight
//         const maxScroll = contentHeight - containerHeight
//         const thumbHeight = this.getThumbHeight()
//         const maxThumbPosition = containerHeight - thumbHeight
//         const scrollRatio = this.state.scrollTop / maxScroll
//         return maxThumbPosition * scrollRatio
//     }

//     render() {
//         const thumbHeight = this.getThumbHeight()
//         const thumbPosition = this.getThumbPosition()

//         return (
//             <div
//                 ref={this.containerRef}
//                 className="w-24 h-24 bg-gray-100 border border-gray-900 relative"
//                 style={{ overflow: 'hidden' }}
//             >
//                 {/* Scrollable content */}
//                 <div
//                     ref={this.contentRef}
//                     className="w-full absolute top-0 left-0"
//                     style={{ overflowY: 'scroll', height: '100%' }}
//                     onScroll={this.handleScroll}
//                 >
//                     {this.props.children}
//                 </div>
//                 {/* Custom scrollbar */}
//                 <div className="absolute top-0 right-0 w-2 bg-gray-200 h-full">
//                     <div
//                         className="w-full bg-gray-600 rounded"
//                         style={{
//                             height: `${thumbHeight}px`,
//                             transform: `translateY(${thumbPosition}px)`,
//                             cursor: 'pointer',
//                         }}
//                         onMouseDown={this.handleThumbDrag}
//                         onTouchStart={this.handleThumbDrag}
//                     />
//                 </div>
//             </div>
//         )
//     }
// }

// // Usage
// function App() {
//     return (
//         <PianoKey idx={1} note="C" isCorrect={true} isPressed={false}>
//             <div style={{ height: '200px' }}>
//                 Scroll me... lots of content here.
//             </div>
//         </PianoKey>
//     )
// }

// export default App
