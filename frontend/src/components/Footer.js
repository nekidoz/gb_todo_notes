import React from 'react'

// Можно было объявить и экспортировать функцию так:
// export default function Footer()
const Footer = () => {
    return (
        <footer className="footer mt-auto py-3">
            <div className="container">
                <span className="text-muted"> This is a footer. </span>
            </div>
        </footer>
    )
}

export default Footer
