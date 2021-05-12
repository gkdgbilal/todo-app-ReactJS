import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Checkbox, FormControlLabel,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import {AddBox, Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";

export default function Todos() {
    const [todos, setTodos] = useState([])
    const [pagination, setPagination] = useState({size: 10, page: 0, totalElements: 0})
    const [loading, setLoading] = useState(false)
    let ignored = false

    const [state, setState] = React.useState({
        checked: false
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const deleteTodo = (id) => {
        axios({
            method: 'delete',
            url: `http://localhost:8000/todos/${id}`
        }).then((response) => {
            const updatedTodos = todos.filter(todo => todo.id !== id)
            setTodos(updatedTodos)
        }).catch((error) => {
            if (error.response) {
                return
            }
        })
    }

    const changeTodoStatus = (updatedState) => {
        axios.put('http://localhost:8000/todos/' + updatedState.id, {...updatedState})
            .then(response => {
                setTodos(prevState => prevState.map(todo => (todo.id === response.data.id ? {
                    ...todo,
                    done: !response.data.done
                } : todo)))
            })
            .catch((error) => {
                if (error.response) {
                    return
                }
            })
    };

    useEffect(() => {
        setLoading(true)

        async function readTodos() {
            //     const response = await axios({
            //         method: 'get',
            //         url: 'http://localhost:8000/todos'
            //     })
            //     if (response.status !== 200) {
            //         return;
            //     }
            //     console.log(response)
            //     setTodos(response.data.content)
            // }

            axios({
                method: 'get',
                url: 'http://localhost:8000/todos'
            }).then((response) => {
                setTodos(response.data)
                // console.log(response);
                setPagination({
                    size: response.data.length,
                    page: response.data.page,
                    totalElements: response.data.totalElements
                })
            }).catch((error) => {
                if (error.response) {
                    return
                }
            }).finally(() => {
                setLoading(false);
            });
        }

        !ignored && readTodos();
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            ignored = true
        }
    }, []);

    //Pagination Operations
    const handleChangePage = (event, newPage) => {
        axios({
            method: 'get',
            url: `http://localhost:8000/todos?page=${newPage}&size=${pagination.size}`
        }).then((response) => {
            setTodos(response.data)
            setPagination({
                size: response.data.size,
                page: response.data.page,
                totalElements: response.data.totalElements
            })
        }).catch((error) => {
            if (error.response) {
                return
            }
        })
    }
    const handleChangeRowsPerPage = (event) => {
        axios({
            method: 'get',
            url: `http://localhost:8000/todos?page=0&size=${parseInt(event.target.value, 10)}`
        }).then((response) => {
            setTodos(response.data)
            setPagination({
                size: response.data.size,
                page: response.data.page,
                totalElements: response.data.totalElements
            })
        }).catch((error) => {
            if (error.response) {
                return
            }
        })
    }

    if (loading) {
        return <>
            <h1>Data is loading...</h1>
        </>
    }
    return <>
        <h1>Todos</h1>
        <TableContainer>
            <IconButton
                component={Link} to="/todos"
                color="primary"
                aria-label="create new todo"
                size="large"
            >
                <AddBox/>
            </IconButton>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left"/>
                        <TableCell align="left"> ID </TableCell>
                        <TableCell align="left"> Title </TableCell>
                        <TableCell align="left"> Description </TableCell>
                        <TableCell align="left"> Done </TableCell>
                        <TableCell align="left"> Created - Date </TableCell>
                        <TableCell align="left"/>
                        <TableCell align="left"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell padding="checkbox">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={todo.done}
                                            onChange={() => {
                                                changeTodoStatus(todo)
                                            }}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label="Done"
                                />
                            </TableCell>
                            <TableCell> {todo.id} </TableCell>
                            <TableCell> {todo.title} </TableCell>
                            <TableCell> {todo.description} </TableCell>
                            <TableCell> {todo.done} </TableCell>
                            <TableCell> {todo.createdDate} </TableCell>
                            <TableCell align="left">
                                <IconButton aria-label="delete">
                                    <Delete onClick={() => {
                                        deleteTodo(todo.id)
                                    }}/>
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    // onClick={() => {
                                    //     history.push(`/edit/${todo.id}`)
                                    // }}
                                    // component={Link} to={`/edit/${todo.id}`}
                                    component={Link} to={`/edit/${todo.id}`}
                                    aria-label="edit">
                                    <Edit/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20, 50, 100]}
                            count={pagination.totalElements}
                            rowsPerPage={pagination.size}
                            page={pagination.page}
                            colspan={8}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </>
}