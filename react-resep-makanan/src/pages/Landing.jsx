import { BlueButton } from "../components/Button";

const Landing = () => {
    return (
        <>
        <BlueButton text='LOGIN' customStyle={{ width: '100%' }} type='button' url ='/user-management/users/signin'></BlueButton>
        </>
    )
};

export default Landing;