import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyClass from './MyClass';
import NavBar from './NavBar';
import { decodeToken } from "../helperFunctions/decodeToken"



export default function MyClasses() {
    const navigate = useNavigate();
    const userToken = localStorage.getItem("token");
    const [classes, setClasses] = useState([]);
    const user = decodeToken();

    useEffect(() => {
        const fetchClass = async () => {
            const AuthStr = "bearer " + userToken;
            try {
                const res = (await axios.get("/classes", { "headers": { "Authorization": AuthStr } })).data;
                if (res.status === "success") {
                    // console.log(res.result)
                    setClasses(res.result);
                } else {
                    navigate("/error")
                }
            } catch (err) {
                navigate("/error");
            }

        }
        fetchClass();
    }, [])

    const currentClass = classes.filter((cl) => cl.isFinished === false);

    const myClasses = user.role === "student" ? classes : currentClass;

    const amClasses = myClasses.filter((cla) => cla.time.split(":")[0] < 12)
    const pmClasses = myClasses.filter((cla) => cla.time.split(":")[0] >= 12)


    return (
        <>
            <NavBar />
            <div className="wrapper" class="myclassesWrapper" style={{ height: "100vh" }}>
                <div className="m-5" >
                    <h2 class="text-center m-5 p-4">Your Classes</h2>
                    {myClasses.length ?
                        <div >
                            <div className="row d-flex" class="lessonsCard">
                                <div style={{ fontSize: 20, fontWeight: "bolder" }} className="col-sm-2"> AM CLASSES </div>
                                {amClasses.length === 0 && <h2 style={{ textAlign: "center" }} >No Current AM Classes </h2>}
                                {myClasses.filter((cla) => cla.time.split(":")[0] < 12).map((item) => <MyClass class={item} key={item._id} />)}
                            </div>

                            <div className="row d-flex" class="lessonsCard">
                                <div style={{ fontWeight: "bolder", fontSize: 20, }} className="col-sm-2"> PM CLASSES </div>
                                {pmClasses.length === 0 && <h2 style={{ textAlign: "center" }} >No Current  PM Classes </h2>}
                                {myClasses.filter((cla) => cla.time.split(":")[0] >= 12).map((item) => <MyClass class={item} key={item._id} />)}
                            </div>
                        </div>
                        :
                        <>
                            <h2 style={{ textAlign: "center", marginTop: 50, fontWeight: "bolder" }} >You currently dont have any Classes Scheduled</h2>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
