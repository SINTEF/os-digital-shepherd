import { UserCircleIcon } from "@heroicons/react/16/solid";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Shepherd, { Tour } from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import UserStep from "./WelcomeStep";
import LocationStep from "./RegionsStep";
import TechnologyStep from "./TechnologyStep";
import DataPreparationStep from "./DataPreparationStep";
import DataSubmissionStep from "./DataSubmissionStep";
import DataSelectionStep from "./DataSelectionStep";
import SummaryStep from "./SummaryStep";
import { useEffect, useRef, useState } from "react";
import { observer } from 'mobx-react';
import { selections } from "./state.ts";

/* Inlined SelectingForm (moved outside App to preserve state) */
const SelectingFormInline: React.FC = observer(() => {
  const [step, setStep] = useState(0);
  const [selectedUserOption, setSelectedUserOption] = useState<string>("");
  const [selectedLocationOption, setSelectedLocationOption] = useState<string>("");
  const [selectedTechnologyOption, setSelectedTechnologyOption] = useState<string>("");
  const [selectedDataPreparationOption, setSelectedDataPreparationOption] = useState<string>("");
  const [selectedDataSubmissionOption, setSelectedDataSubmissionOption] = useState<string>("");
  const [selectedDataSelectionOption, setSelectedDataSelectionOption] = useState<string>("");

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <UserStep
            selectedOption={selectedUserOption}
            setSelectedOption={setSelectedUserOption}
            setStep={setStep}
          />
        );
      case 1:
        return (
          <LocationStep
            selectedOption={selectedLocationOption}
            setSelectedOption={setSelectedLocationOption}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <TechnologyStep
            setStep={setStep}
            selectedOption={selectedTechnologyOption}
            setSelectedOption={setSelectedTechnologyOption}
          />
        );
      case 3:
        return (
          <DataPreparationStep
            setStep={setStep}
            selectedOption={selectedDataPreparationOption}
            setSelectedOption={setSelectedDataPreparationOption}
          />
        );

      case 4:
        return (
          <DataSubmissionStep
            setStep={setStep}
            selectedOption={selectedDataSubmissionOption}
            setSelectedOption={setSelectedDataSubmissionOption}
          />
        );
      case 5:
        return (
          <DataSelectionStep
            setStep={setStep}
            selectedOption={selectedDataSelectionOption}
            setSelectedOption={setSelectedDataSelectionOption}
          />
        );
      case 6:
        return (
          <SummaryStep
            setStep={setStep}
            optionList={{
              location: selectedLocationOption,
              technology: selectedTechnologyOption,
              dataPreparation: selectedDataPreparationOption,
              dataSubmission: selectedDataSubmissionOption,
              dataSelection: selectedDataSelectionOption,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center text-center items-center mt-10 p-4 bg-neutral rounded shadow-lg w-full max-w-xxl">
      <ul id="progressbar" className="steps w-full">
        <li className={`step ${step >= 0 ? "step-accent" : ""} shepherd-step-user`}>Welcome</li>
        <li className={`step ${step >= 1 ? "step-accent" : ""} shepherd-step-location`}>Regions</li>
        <li className={`step ${step >= 2 ? "step-accent" : ""} shepherd-step-technology`}>Technology</li>
        <li className={`step ${step >= 3 ? "step-accent" : ""} shepherd-step-datapreparation`}>Data Preparation</li>
        <li className={`step ${step >= 4 ? "step-accent" : ""} shepherd-step-datasubmission`}>Data Submission</li>
        <li className={`step ${step >= 5 ? "step-accent" : ""} shepherd-step-dataselection`}>Data Selection</li>
        <li className={`step ${step >= 6 ? "step-accent" : ""} shepherd-step-gdtaccess`}>GDT Access</li>
      </ul>
      {renderStep()}
    </div>
  );
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModal2Open, setIsModal2Open] = useState<boolean>(false);
  const [updateLog, setUpdateLog] = useState("");
    useEffect(() => {
      fetch(`${import.meta.env.BASE_URL}update-log.html`)
        .then(r => r.text())
        .then(setUpdateLog);
    }, []);
  const storedUsername = sessionStorage.getItem("username");
  const { setUserName } = selections;

  const navigate = useNavigate();
  const location = useLocation();
  const tourRef = useRef<Tour | null>(null);


  useEffect(() => {
    if (!loggedIn && !storedUsername) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [loggedIn]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModal2 = () => {
    setIsModal2Open(!isModal2Open);
  };

  const isLoginPage = location.pathname === "/login";

  const LoginPageInline: React.FC<{ loggedIn: boolean; setLoginFunction: (value: boolean) => void }> = ({ loggedIn, setLoginFunction }) => {
    const { setUserName, setUserId } = selections;

    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    if (loggedIn) {
      return null;
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const validUsername = 'admin';
        const validPassword = 'demo';

        if (user === validUsername && password === validPassword) {
          const token = 'static-token-' + Date.now();
          const userId = 'admin-user-001';

          setUserName(user);
          setUserId(userId);
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("username", user);
          localStorage.setItem("name", "Region1");
          localStorage.setItem("country", "RE");
          localStorage.setItem("org_name", "Admin");

          setLoginFunction(true);
          setError(null);
        } else {
          setError('Invalid username or password. Use admin/demo');
        }
      } catch (error) {
        setError('An error occurred while trying to log in');
      }
    };

    return (
      <div className="flex items-start justify-center min-h-screen bg-primary">
        <div className="text-center w-full max-w-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neutral">
              <span className="inline-block">
                Welcome to the RESIST Graphical Digital Twin!
              </span>
            </h1>
          </div>
          <p className="text-neutral mb-8">
            This platform will guide you through the available digital-twin
            technologies and climate-risk scenarios of the RESIST EU project.
          </p>
          <form className="space-y-4" onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmit(event)}>
            <input
              type="text"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="input input-bordered text-neutral bg-base-content w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="input input-bordered text-neutral bg-base-content w-full"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button className="btn btn-secondary w-full" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  function logout(): void {
    sessionStorage.removeItem("username");
    setUserName("");
    setLoggedIn(false);
    navigate("/login");
  }


const startTour = () => {
    if (tourRef.current) {
      tourRef.current.cancel();
      tourRef.current = null;
    }

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        classes: "shepherd-theme-arrows",
        scrollTo: { behavior: "smooth", block: "center" },
      },
    });

    tour.addStep({
      id: "user-step",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      attachTo: { element: ".shepherd-step-user", on: "bottom" }, 
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      id: "location-step",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      attachTo: { element: ".shepherd-step-location", on: "bottom" }, 
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      id: "technology-step",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      attachTo: { element: ".shepherd-step-technology", on: "bottom" }, 
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      id: "datapreparation-step",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      attachTo: { element: ".shepherd-step-datapreparation", on: "bottom" },
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      id: "datasubmission-step",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      attachTo: { element: ".shepherd-step-datasubmission", on: "bottom" }, 
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      id: "dataselection-step",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      attachTo: { element: ".shepherd-step-dataselection", on: "bottom" }, 
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      id: "gdtaccess-step",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      attachTo: { element: ".shepherd-step-gdtaccess", on: "bottom" },
      buttons: [{ text: "End tour", action: tour.complete }],
    });

    tourRef.current = tour;
    document.dispatchEvent(new Event("shepherd-start")); 
    tour.start();
  };

useEffect(() => {
  let tourJustStarted = false;

  const handleOutsideClick = (event: MouseEvent) => {
    if (tourJustStarted) {
      tourJustStarted = false;
      return;
    }

    if (
      tourRef.current &&
      tourRef.current.isActive() &&
      event.target instanceof Element &&
      !event.target.closest(".shepherd-content")
    ) {
      tourRef.current.cancel();
    }
  };

  const handleStartTour = () => {
    tourJustStarted = true;
  };

  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("shepherd-start", handleStartTour);

  return () => {
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("shepherd-start", handleStartTour);
  };
}, []);


  return (
    <div className="bg-primary">
      <div className="flex flex-col justify-between">
        <div className="flex flex-row justify-between">
          <div className="text-start">
            <img
              src={`${import.meta.env.BASE_URL}RESIST_logo.png`}
              alt="RESIST logo"
              className="h-[7rem]"
            />
          </div>

          {isLoginPage && (
            <div className="text-start">
              <a
                href="https://resist-project.eu"
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <img
                  src={`${import.meta.env.BASE_URL}EU_logo.png`}
                  alt="EU Logo"
                  className="h-10 mx-auto mt-8"
                />
              </a>
            </div>
          )}

          {!isLoginPage && (
            <div className="flex flex-row items-center gap-2 pt-4">
              <UserCircleIcon className="size-8 text-white" />
              <span className="text-white">{localStorage.getItem("name")}, {localStorage.getItem("country")}</span>
              <span
                className="text-accent cursor-pointer ml-4"
                onClick={toggleModal}
              >
                Support
              </span>
              <span className="text-accent cursor-pointer ml-2" onClick={startTour}>
                Take a tour
              </span>
              <span className="text-accent cursor-pointer ml-2" onClick={logout}>
                Logout
              </span>
            </div>
          )}
        </div>

        <main className="flex-grow">
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md">
          <div className="flex justify-end">
            <button
              onClick={toggleModal}
              className="text-gray-500 hover:text-gray-900 leading-none ml-auto"
            >
              × Close
            </button>
          </div>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                  Vestibulum venenatis elementum rhoncus. Vivamus orci purus, <br />
                  dignissim et diam quis, rutrum euismod libero. Quisque in augue <br />
                  quam. Nulla tempus leo et euismod gravida. Integer aliquet turpis <br />
                  risus, aliquam viverra felis egestas ut. Aenean dignissim justo <br />
                  id eros auctor, accumsan rhoncus ligula congue. Nunc sagittis tristique <br />
                  feugiat. Vivamus eros ex, bibendum vitae ligula ac, sodales pulvinar arcu.
                </p>
              </div>
            </div>
          )}
          {isModal2Open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md max-h-[80vh] overflow-y-auto">
              <div className="flex justify-end">
                <button
                  onClick={toggleModal2}
                  className="text-gray-500 hover:text-gray-900 leading-none ml-auto"
                >
                  × Close
                </button>
              </div>
                              
              <p
                className="mt-4 text-left"
                dangerouslySetInnerHTML={{ __html: updateLog }}
              />

              </div>
            </div>
          )}

          <Routes>
            <Route
              path="login"
                element={
                  <LoginPageInline loggedIn={loggedIn} setLoginFunction={setLoggedIn} />
                }
            />
            <Route
              path="/"
              element={
                <div className="flex flex-col justify-center gap-20">
                    <SelectingFormInline />
                </div>
              }
            />
          </Routes>
        </main>

        {!isLoginPage && (
          <footer className="bg-primary py-4 text-center">
            <p className="text-right text-accent italic text-sm">
              <span
                className="text-accent cursor-pointer ml-4"
                onClick={toggleModal2}
              >
                Update log
              </span>            
            </p> 
            <a
              href="https://resist-project.eu"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <img
                src={`${import.meta.env.BASE_URL}EU_logo.png`}
                alt="EU Logo"
                className="h-10 mx-auto mt-2"
              />
            </a>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
