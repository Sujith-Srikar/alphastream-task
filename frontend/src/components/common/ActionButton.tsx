import {useUser} from "../../context/UserContext"
import type { User } from "../../types/types"
import { Button } from "antd";
import { useNavigate } from "react-router";

type ActionButtonProps = {
    user: User;
}

function ActionButton({user}: ActionButtonProps) {

    const navigate = useNavigate();
    const {setUserId} = useUser();

    function handleButtonClick(){
        setUserId(user.userId);
        localStorage.setItem("userId", user.userId);
        navigate("/dashboard");
    }

  return (
    <Button type="primary" onClick={handleButtonClick}>Enter</Button>
  )
}

export default ActionButton