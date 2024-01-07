import React, { useState } from 'react'
import Common from './com/Common'

export default function Createcolumn() {
    let [state, setstate] = useState([])
    let [fetchothercomp,setfetchothercomp]=useState({})
    function check() {
        
        fetch("http://localhost:5000/").then(data => {
            if (data.ok == true) {
                data.json().then(data => {
                    console.log(data)
                    setstate(data)

                }).catch(err => {
                    console.log(err)
                })
            }
            else {
                data.json().then(err => {
                    console.log(err)
                    alert(err.error)
                })
            }
        })
            .catch(err => {
                console.log(err)

            })
    }
    // check()
    return (
        <div>
            <Common click={check} data={setfetchothercomp} />
            <table border={1} width={"100%"}>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>Type</th>
                        <th>Null</th>
                        <th>Key</th>
                        <th>Default</th>
                        <th>Extra</th>

                    </tr>
                </thead>
                <tbody >
                    {
                        state.map(element => {
                            return (
                                <tr>
                                    <td>{element.Field}</td>
                                    <td>{element.Type}</td>
                                    <td>{element.Null}</td>
                                    <td>{element.Key}</td>
                                    <td>{element.Default}</td>
                                    <td>{element.Extra}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
