import React from "react";

const LoginFbGoogle = (props) => {
    return (
        <div>
            <div className="form-divider text-center bg-white">
                <p>Or</p>
            </div>

            <div className="tg-thirdparty-login">
                <button className="btn btn-secondary" onClick={props.facebook}>
                    <span>
                        <img src={require("../../images/Icon/fb.png")} style={{ maxWidth: "35px" }} alt="fb logo" />
                    </span>
                    <span>Continue with Facebook</span>
                </button>
                <button className="btn btn-secondary" onClick={props.google}>
                    <span>
                        <img src={require("../../images/Icon/google.png")} style={{ maxWidth: "35px" }} alt="fb logo" />
                    </span>
                    <span>Continue with Google</span>
                </button>
            </div>
        </div>
    );
};

export default LoginFbGoogle;