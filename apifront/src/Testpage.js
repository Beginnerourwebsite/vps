import React, { useEffect, useState } from 'react'

export default function Testpage() {
    let [states, setstate] = useState([])
    let [states1, setstate1] = useState(0)
    function uploadFile() {
        const fileInput = document.getElementById('fileInput');
        const textInput = document.getElementById('textInput');
        const textclass = document.getElementById('textclass');

        const file = fileInput.files[0];
        let obj = {
            name: textInput.value,
            class: textclass.value
        }
        const text = textInput.value;

        // if (file || text.trim() !== '') {
        const formData = new FormData();
        formData.append('file', file);
        formData.append("text", JSON.stringify(obj))

        fetch('http://localhost:3010/upload', {
            method: 'POST',
            body: formData,
        }).then(response => response.json()
            .then(data => {
                console.log(data);
                setstate1(states1 + 1)
            }))

    }
    useEffect(() => {
        // if (states.length != 0) {
        fetch("http://localhost:3010").then(data => {
            data.json().then(data => {
                console.log(data)
                setstate(data)

            })
        })
        // }
    }, [states1])

    // show()
    return (
        <div><h1>File and Text Upload Example</h1>
            {/* <form id="uploadForm"> */}
            <label htmlFor="fileInput">Select a file:</label>
            <input type="file" id="fileInput" name="file" />
            {/* Set the accept attribute to specify allowed file types */}
            <br /><br /><label htmlFor="textInput">Enter name:</label>
            <input type="text" id="textInput" name="text" />
            <br /><br /> <label htmlFor="textclass">Enter class:</label>
            <input type="text" id="textclass" name="text" />
            <button type="button" onClick={uploadFile}>Upload</button>
            {/* </form> */}
            <div id="showhere" />
            {
                states.map(element => {
                    console.log(element)

                    if ((element.types).split("/")[0] == "image") {
                        return (
                            <img src={element.files} width={"100px"} height={"100px"} alt="" />
                        )

                    }
                    // console.log(element)
                    else if (element.types == "text/html") {
                        return (
                            <iframe src={element.files} width={"100px"} height={"100px"} frameborder="0"></iframe>
                        )

                    }
                })

            }
        </div>

    )
}
