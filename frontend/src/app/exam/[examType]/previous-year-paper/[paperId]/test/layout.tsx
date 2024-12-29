import React from 'react';

export default function TestLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Test Series</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
            </head>
            <body style={{ margin: 0, padding: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                    {children}
                </div>
            </body>
        </html>
    );
}

// Prevent the parent layout from wrapping this page
TestLayout.getLayout = function getLayout(page: React.ReactNode) {
    return page; // Return the page as-is without applying any parent layout
};
