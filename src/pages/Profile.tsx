import { FormEvent, useEffect, useRef, useState } from "react";
import { IUser } from "../models/IUser";
import { getUser } from "../utils/storage";

export default function Profile() {
  const user: IUser | null = getUser();
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user != null) {
      firstnameRef.current!.value = user.firstName;
      lastnameRef.current!.value = user.lastName;
      emailRef.current!.value = user.email;
    }
  }, []);

  function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    makeRed(emailRef.current!, emailRef.current!.value.trim() === "");
    makeRed(lastnameRef.current!, lastnameRef.current!.value.trim() === "");
    makeRed(firstnameRef.current!, firstnameRef.current!.value.trim() === "");
  }

  function makeRed(input: HTMLInputElement, isError: boolean) {
    if (isError) {
      input.style.borderColor = "red";
      input.style.borderWidth = "2px";
      input.focus();
    } else {
      input.style.borderColor = "grey";
      input.style.borderWidth = "1px";
    }
  }

  return (
    <div className="row">
      <div className="col-sm-6">
        <h2>Profile</h2>
        {user && (
          <form onSubmit={sendForm}>
            <div className="mb-3">
              <input ref={firstnameRef} className="form-control" placeholder="firstname" defaultValue={user.firstName} />
            </div>
            <div className="mb-3">
              <input ref={lastnameRef} className="form-control" placeholder="lastname" defaultValue={user.lastName} />
            </div>
            <div className="mb-3">
              <input ref={emailRef} className="form-control" placeholder="email" defaultValue={user.email} />
            </div>
            <div className="mb-3">
              <button className="btn btn-success" type="submit">
                send
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="col-sm-6"></div>
    </div>
  );
}
