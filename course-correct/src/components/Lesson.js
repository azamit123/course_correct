import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



export default function Lesson(props) {
    const navigate = useNavigate();
    const { subjectName,
        type,
        day,
        startTime,
        endTime,
        pic,
        fee,
        _id,
        tutorPic,
        description,
        tutorName } = props.subject;

    const image = "http://localhost:5000/images/" + pic;
    const userImg = "http://localhost:5000/images/" + tutorPic;
    const [isDetail, setIsDetail] = useState(false);


    const handleMoreDetail = () => {
        setIsDetail(!isDetail);
    }



    return (
        <>
            {!isDetail &&
                <div className="m-3" data-testid="1">
                    <Card style={{ width: '18rem' }}  >
                        <Card.Img variant="top" src={image} style={{ width: '18rem', height: '18rem' }} />
                        <Card.Body>
                            <Card.Title>{subjectName}</Card.Title>
                            <Card.Text>
                                ${fee}/Week
                                 <p>WEEKLY SCHEDULE AVAILABILITY</p>
                                {day.map((item, index) =>
                                    <Card.Text key={index}>
                                        {item} -   From{startTime}-To-{endTime}
                                    </Card.Text>
                                )}
                            </Card.Text>
                            <Card.Text>
                                <p>Type:{type}</p>
                            </Card.Text>
                            <Button variant="dark" className="m-1" onClick={handleMoreDetail}>Tutor Details</Button>
                            <Button variant="dark" className="m-1" onClick={() => navigate(`/enroll/${_id}`, { state: { subject: props.subject } })}>Enroll Class</Button>
                        </Card.Body>
                    </Card>
                </div>
            }

            {isDetail &&
                <div>
                    <Card style={{ width: '18rem' }}  >
                        <Card.Img variant="top" src={userImg} />
                        <Card.Body>
                            <Card.Title>Tutor Name: {tutorName}</Card.Title>
                            <Card.Text>
                                <p>{description}</p>
                            </Card.Text>
                            <Button variant="dark" className="m-1" onClick={handleMoreDetail}>back</Button>
                        </Card.Body>
                    </Card>
                </div>

            }
        </>
    )
}
