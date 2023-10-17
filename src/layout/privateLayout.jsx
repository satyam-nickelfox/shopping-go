import * as React from "react"
import Header from "../component/Header"
export default function PrivateLayout({ children }) {

  return (
    <div>
        <Header />
       {children}
    </div>
  )
}
