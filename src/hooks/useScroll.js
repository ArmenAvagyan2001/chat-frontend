import {useEffect, useRef} from "react";

export default function useScroll(parentRef, childRef, callback) {

    const observer = useRef()

    useEffect(() => {
        if (parentRef.current && childRef.current) {
            const options = {
                root: parentRef.current,
                rootMargin: '0px',
                threshold: 0
            }

            observer.current = new IntersectionObserver(([target]) => {
                if (target.isIntersecting) {
                    callback()
                }
            }, options)

            observer.current.observe(childRef.current)

            return function () {
                if (childRef.current) {
                    observer.current.unobserve(childRef.current)
                }
            }
        }
    }, [callback])
}