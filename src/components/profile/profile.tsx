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
            <div className="container-xxl col-10 mb-5 shadow-lg" style={{backgroundColor: "#D2D3D500"}}>
                <div className="d-flex flex-column flex-xl-row gap-5 align-items-center link-body-emphasis text-decoration-none p-5">
                    <div className='col-10 col-md-6 col-xl-4'>
                        <img src={"images/profile-6.JPG"} width={'100%'}/>
                    </div>
                    <div className="col-xl-8 px-5">
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