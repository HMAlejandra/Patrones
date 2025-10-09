"use client"

import { useEffect, useRef } from "react"

export function AnimatedBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Bubble {
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      color: string
      opacity: number
    }

    const bubbles: Bubble[] = []
    const colors = [
      "rgba(236, 72, 153, 0.3)", // pink-500
      "rgba(244, 114, 182, 0.25)", // pink-400
      "rgba(251, 207, 232, 0.2)", // pink-200
      "rgba(219, 39, 119, 0.25)", // pink-600
      "rgba(190, 24, 93, 0.2)", // pink-700
    ]

    // Crear burbujas
    for (let i = 0; i < 30; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 60 + 20,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach((bubble) => {
        // Actualizar posición
        bubble.x += bubble.speedX
        bubble.y += bubble.speedY

        // Rebotar en los bordes
        if (bubble.x + bubble.radius > canvas.width || bubble.x - bubble.radius < 0) {
          bubble.speedX *= -1
        }
        if (bubble.y + bubble.radius > canvas.height || bubble.y - bubble.radius < 0) {
          bubble.speedY *= -1
        }

        // Dibujar burbuja
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle = bubble.color
        ctx.fill()

        // Agregar brillo
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius / 3,
          bubble.y - bubble.radius / 3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius,
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />
}
