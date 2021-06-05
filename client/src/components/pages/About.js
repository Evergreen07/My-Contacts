import React from 'react'

const About = () => {
    return (
        <div className="about">
            <div style={{ marginBottom:'3rem' }}>
                <h1>Features</h1>
                <div className="features">
                    <div className="box"><h2> <i className="fas fa-sign-in-alt"></i> &nbsp;Register/Login </h2></div>
                    <div className="box"><h2><i className="fas fa-user-plus"></i> &nbsp;Create Contacts </h2></div>
                    <div className="box"><h2><i className="fas fa-edit"></i> &nbsp;Update Contacts </h2></div>
                    <div className="box"><h2><i className="fas fa-trash"></i> &nbsp;Delete Contacts </h2></div>
                    <div className="box"><h2><i className="fas fa-list-alt"></i> &nbsp;View /  Filter Contacts </h2></div>
                    <div className="box"><h2><i className="fas fa-sign-out-alt"></i> &nbsp;Logout </h2></div>
                </div>
            </div>

            {/* <div style={{ marginBottom:'2rem' }}>
                <h1>Tech Stacks</h1>
                <div className="features">
                    <div className="box"><h3 style={{fontWeight:'bold'}}> React Js </h3></div>
                    <div className="box"><h3 style={{fontWeight:'bold'}}> Node Js </h3></div>
                    <div className="box"><h3 style={{fontWeight:'bold'}}> Mongo DB </h3></div>
                    <div className="box"><h3 style={{fontWeight:'bold'}}> Express Js </h3></div>
                    <div className="box"><h3 style={{fontWeight:'bold'}}> JWT Authenication </h3></div>
                    <div className="box"><h3 style={{fontWeight:'bold'}}> Bcrypt Js </h3></div>
                </div>
            </div> */}
        </div>
    )
}

export default About
