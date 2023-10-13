import { useEffect, useState } from "react";

const API ="http://aws-be-env.eba-ppktmvzs.ap-south-1.elasticbeanstalk.com/ceo"
function User() {
    const [formState, setFormState] = useState(null);
    const [userState, setUserState] = useState([
        {
            name:"Elon Musk",
            tagline:"Hmm,I want to play",
            description:"Ok, let's change Twitter to X"
        }
    ]);

    const fetchUser = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            console.log("data",data)
            setUserState(data?.users || []);
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState((preState) => ({
            ...preState,
            [name]: value
        }))

    }

    const handleSubmit = async () => {
        if(!formState) return;
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState)
            };
            console.log(requestOptions)
            const response = await fetch(API,requestOptions);
            console.log(response)
            const data = await response.json();
            setUserState((preState)=>[...preState, {...formState}]);
            setFormState(null)
        } catch (err) {
            console.log(err)
        }
    }

    const renderUser = (user, index) => {

        return <div key={index}>
            {index === 0 && <>
                <div className="user-header">
                    <div className="item-min-width">Name</div>
                    <div className="item-min-width">Tagline</div>
                    <div className="item-min-width">Description</div>
                </div>
            </>}
            <div className="user-items">
                <div className="item-min-width">{user.name}</div>
                <div className="item-min-width">{user.tagline}</div>
                <div className="item-min-width">{user.description}</div>
            </div>
        </div>
    }

    useEffect(()=>{
        fetchUser();
    },[])
    return (
        <div className="App">
            <div className="Container">
                <h1>Users:</h1>
                <div className="section-user-list">
                        {userState?.map((item, index) =>renderUser(item,index))}
                        {userState.length == 0 && <div>No data</div>}
                </div>
                <div className="section-user-form">

                        <input type="text" value={formState?.name || ""} name="name" onChange={handleChange} />
                        <input type="text" value={formState?.tagline || ""} name="tagline" onChange={handleChange} />
                        <input type="text" value={formState?.description || ""} name="description" onChange={handleChange} />
                        <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );

}
export default User;