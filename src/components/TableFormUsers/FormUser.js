import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import styleTable from './table.module.css'
var uniqid = require('uniqid')

export default function FormUser() {
    const [list, setList] = useState([]);
    const [editTodo, setEditTodo] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [position, setPosition] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value
        const age = e.target.elements.age.value
        const position = e.target.elements.position.value
        const phone = e.target.elements.phone.value


        const newList = {
            id: uniqid(),
            name,
            age,
            position,
            phone
        }
        if (name === '' || age === '' || position === '' || phone === '') {
            alert('Inputlar bos ola bilmez')
        } else {
            setList((itemList) => {
                return itemList.concat(newList)
            })
        }
        setName("")
        setAge("")
        setPosition("")
        setPhone("")

    }

    const deleteTab = (id) => {
        const delTab = list.filter((itemFil) => {
            console.log(itemFil.id + ": " + id)
            return itemFil.id !== id
        })

        setList([...delTab])
    }

    const editTab = (id) => {
        const EditTab = list.filter((itemEdit) => {
            return itemEdit.id === id
        })
        setEditTodo(...EditTab)
    }
    useEffect(() => {
        console.log(editTodo.name)
        console.log(editTodo.position)
    }, [editTab])


    return (

        <div>
            <div className={styleTable.table}>
                <form onSubmit={handleSubmit}>
                    <div className={styleTable.FormInputbseDiv}>
                        <input value={editTodo.name} onChange={(e) => setName(e.target.value)} name='name' className={`mt-4 w-25  form-control`} type="text" placeholder='FullName' />
                        <input value={editTodo.age} onChange={(e) => setAge(e.target.value)} name='age' className={`mt-4 w-25  form-control`} type="text" placeholder='age' />
                        <input onChange={(e) => setPosition(e.target.value)} name='position' className={`mt-4 w-25  form-control`} type="text" placeholder='Position' />
                        <input onChange={(e) => setPhone(e.target.value)} name='phone' className={`mt-4 w-25  form-control`} type="text" placeholder='Phone' />
                        <button
                            className={`btn ${name === '' ||
                                age === '' ||
                                position === '' ||
                                phone === '' ? "btn-secondary" : "btn-primary"} w-25 mt-2`}
                            type='submit'
                        >{editTodo === true ? 'Update' : "Add"}</button>

                    </div>
                </form>
                <div className={`bg-warning text-dark p-1 w-100 mt-4 rounded`}>
                    <span>Sizin bu cedvelin icinde: <span className={`text-danger`}> {list.length} </span> istifadeceniz var</span>
                </div>
                <table className={`table table-hover table-bordered mt-1`}>
                    <thead className=''>

                        <tr>
                            <th scope="col">FullName</th>
                            <th scope="col">Age</th>
                            <th scope="col">Position</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item, id) => (
                                <tr key={id}>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.position}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button onClick={() => editTab(item.id)} className={`btn btn-warning`}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteTab(item.id)} className={`btn btn-danger`}>delet</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
