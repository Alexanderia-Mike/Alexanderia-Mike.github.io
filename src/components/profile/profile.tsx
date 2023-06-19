import React from 'react';
import { EmojiLaughing } from 'react-bootstrap-icons';

interface Props {
    // TODO
};

interface ItemProps {
    keyName: string;
    value: string;
};

class ProfileItem extends React.Component<ItemProps> {
    render(): React.ReactNode {
        return (
            <div className='my-3'>
                <strong>{this.props.keyName + ": "}</strong>
                <span>{this.props.value}</span>
            </div>
        )
    }
}

class Profile extends React.Component<Props> {
    render(): React.ReactNode  {
        return (
            <div className="container-fluid col-10" style={{backgroundColor: "#BEBDB8"}}>
                <div className="d-flex flex-column flex-lg-row gap-5 align-items-start align-items-lg-center link-body-emphasis text-decoration-none p-5">
                    <img className='col-4' src={"images/profile-picture.jpg"}/>
                    <div className="col-8 px-5">
                        <div className='d-flex flex-row gap-3'>
                            <h2 className="mb-0">Hi! Welcome to my website! </h2>
                            <EmojiLaughing size={30}/>
                        </div>
                        <hr/>
                        <ProfileItem keyName='Name' value='Chenfei Lou'/>
                        <ProfileItem keyName='D.O.B' value='05/16/2000'/>
                        <ProfileItem keyName='Phone' value='+1 (608) 698-6592'/>
                        <ProfileItem keyName='Address' value='4742 Centre Ave, Pittsburgh, PA, 15213'/>
                        <ProfileItem keyName='E-mail' value='chenfeil@andrew.cmu.edu'/>
                        <ProfileItem keyName='Github' value='Alexanderia-Mike.github.com'/>
                        <ProfileItem keyName='LinkedIn' value='linkedin.com/in/mike-lou/'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;