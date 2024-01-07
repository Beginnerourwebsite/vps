import React, { useState } from 'react'
import "../style/css.css"
export default function Common(prop) {
    let [sameinputbox, setsameinputbox] = useState({ ...JSON.parse(localStorage.getItem("maindetail")) })
    function samebox(e) {

        setsameinputbox({ ...sameinputbox, [e.target.name]: e.target.value })

    }
    function save() {
        let data = document.getElementById("Checksaveornot").checked
        if (data == true) {
            localStorage.setItem("maindetail", JSON.stringify(sameinputbox))
        }
        // connect
        fetch("http://localhost:5000/connect", {
            method: "post",
            body: JSON.stringify(sameinputbox),
            headers: {
                "content-type": "application/json"
            }
        }).then(data => {
            data.json().then(data => {
                if (data.status == "connected") {

                    prop.data(sameinputbox)
                    prop.click()
                }
            })
        })
    }
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div id='commonfirstdiv'>
                <h1 style={{ fontSize: "50px" }}>Main Information</h1>
                <input type="search" value={sameinputbox.Host} onChange={samebox} placeholder='Host (Double Click for Option)' list='lists' name="Host" id="" />
                <datalist id='lists'>
                    <option value="localhost">localhost</option>
                    <option aria-readonly value="Online">Online</option>
                </datalist>

                <div>
                    <input type="text" value={sameinputbox.username} onChange={samebox} placeholder='userName' name="username" id="" />
                    <input type="text" name="password" value={sameinputbox.password} onChange={samebox} placeholder='passWord' id="" />
                </div>
                <div>

                    <input value={sameinputbox.database} type="text" onChange={samebox} name="database" placeholder='DataBase Name' id="" />
                    <input value={sameinputbox.tablename} type="text" name="tablename" onChange={samebox} placeholder='Table Name' id="" />
                </div>
                <input type="checkbox" name="" id="Checksaveornot" /><label htmlFor="Checksaveornot">Save Details</label>
                <br />
                <button id='fullTable' onClick={save}>Table check</button>
                <button >next</button>
            </div>
        </div>
    )
}
