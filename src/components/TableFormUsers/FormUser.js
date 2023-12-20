import React, { useEffect, useRef, useState } from 'react'
import styleTable from './table.module.css'
var uniqid = require('uniqid')
export default function FormUser() {
    const [list, setList] = useState([]);
    const [editTodo, setEditTodo] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();


       

        const name = e.target.elements.name.value
        const age = e.target.elements.age.value
        const position = e.target.elements.position.value
        const phone = e.target.elements.phone.value

        const newList = {
            id: uniqid(), name, age, position, phone
        }

         // if (editTodo) {
        //     const editTodoLists = list.find((i) => i.id === editTodo);
        //     const updateTodos = list.map((t) =>
        //         t.id === editTodoLists.id
        //     );
        //     setList(updateTodos);
        //     setEditTodo(0);
        //     return;
        // }

       



        if (name === '' || age === '' || position === '' || phone === '') {
            alert('Inputlar bos ola bilmez')
        } else {
            setList((itemList) => {
                return itemList.concat(newList)
            })
            setEditTodo([...editTodo, newList])
        }
        e.target.elements.name.value = ""
        e.target.elements.age.value = ""
        e.target.elements.position.value = ""
        e.target.elements.phone.value = ""
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
    return (
        <div>
            <div className={styleTable.table}>
                <form onSubmit={handleSubmit}>
                    <div className={styleTable.FormInputbseDiv}>
                        <input value={editTodo.name} onChange={(e) => setEditTodo(e.target.value)} name='name' className={`mt-4  form-control `} type="text" placeholder='FullName' />
                        <input value={editTodo.age} onChange={(e) => setEditTodo(e.target.value)} name='age' className={`mt-4  form-control`} type="text" placeholder='age' />
                        <input value={editTodo.position} onChange={(e) => setEditTodo(e.target.value)} name='position' className={`mt-4  form-control`} type="text" placeholder='Position' />
                        <input value={editTodo.phone} onChange={(e) => setEditTodo(e.target.value)} name='phone' className={`mt-4  form-control`} type="text" placeholder='Phone' />
                        <button class='btn btn-primary w-25 mt-4'>Add</button>
                    </div>
                </form>
                <div className={`bg-warning text-dark p-1 w-100 mt-4 rounded`}>
                    <span>Sizin bu cedvelin icinde: <span className={`text-danger`}> {list.length} </span> istifadeceniz var</span>
                </div>
                <table className={`table table-hover table-bordered mt-1`}>
                    <thead class="thead-dark">
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
