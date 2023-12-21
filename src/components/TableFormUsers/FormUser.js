import React, { useState } from 'react'
import styleTable from './table.module.css'
var uniqid = require('uniqid')
export default function FormUser() {
    const [list, setList] = useState([]);
    const [value, setValue] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);

    const addUser = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value
        const age = e.target.elements.age.value
        const position = e.target.elements.position.value
        const phone = e.target.elements.phone.value

        const newList = {
            id: uniqid(), name, age, position, phone
        }

        if (name === '' || age === '' || position === '' || phone === '') {
            alert('Inputlar bos ola bilmez')
        } else {
            setList((itemList) => {
                return itemList.concat(newList)
            })
            setValue([...value, newList])
        }
        e.target.elements.name.value = ""
        e.target.elements.age.value = ""
        e.target.elements.position.value = ""
        e.target.elements.phone.value = ""
    }

    const deleteTab = (id) => {
        const delTab = list.filter((itemFil) => {
            return itemFil.id !== id
        })
        setList([...delTab])
    }

    const editTab = (id) => {
        const EditTab = list.filter((itemEdit) => {
            return itemEdit.id === id
        })
        setValue(...EditTab)
        setShowUpdate(!showUpdate)
    }
    const saveTodo = (e) => {
        e.preventDefault();
        console.log('Hello')
    }
    return (
        <div>
            <div className={styleTable.table}>
                <form onSubmit={addUser}>
                    <div className={styleTable.FormInputbseDiv}>
                        <input value={value.name} onChange={(e) => setValue(e.target.value)} name='name' className={`mt-4  form-control `} type="text" placeholder='FullName' />
                        <input value={value.age} onChange={(e) => setValue(e.target.value)} name='age' className={`mt-4  form-control`} type="text" placeholder='age' />
                        <input value={value.position} onChange={(e) => setValue(e.target.value)} name='position' className={`mt-4  form-control`} type="text" placeholder='Position' />
                        <input value={value.phone} onChange={(e) => setValue(e.target.value)} name='phone' className={`mt-4  form-control`} type="text" placeholder='Phone' />
                        <div className={styleTable.btnsBase}>
                            {
                                showUpdate ?
                                    <button onClick={saveTodo} className={`${'btn btn-warning w-50 mt-4'} ${styleTable.btnsbtn}`}>Update</button> :
                                    <button className={`${'btn btn-primary w-50 mt-4'} ${styleTable.btnsbtn}`}>Add</button>
                            }
                        </div>
                    </div>
                </form>
                <div className={`${'bg-warning text-dark p-1 w-100  rounded'} ${styleTable.textCount}`}>
                    <span>Sizin bu cedvelin icinde: <span className={`text-danger`}> {list.length} </span> istifadeceniz var</span>
                </div>
                <table className={`${'table table-hover table-bordered mt-1'} ${styleTable.tableHeader}`}>
                    <thead className="thead-dark">
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
