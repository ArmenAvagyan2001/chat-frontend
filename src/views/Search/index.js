import React, {useEffect, useState} from 'react';
import InputCustom from "../../components/customs/InputCustom";
import $api from "../../http";
import User from "./User";

const Search = () => {

    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (search) {
            $api.get(`/api/users/${search}`).then(res => {
                setUsers(res.data)
            })
        }else {
            setUsers([])
        }

    }, [search])


    return (
        <div className='search'>
            <div className='component'>
                <div className='searchForm'>
                    <InputCustom
                        label='Search...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='users'>
                    {users.map((user) => {
                        return (
                            <User key={user.id} user={user} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Search;