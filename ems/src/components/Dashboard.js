// // import React, { useState, useEffect } from "react";
// // import Card from "./Card";
// // import Footer from "./Footer";
// // import axios from "axios";

// // const Dashboard = () => {
// //   const [staffCount, setStaffCount] = useState(0);
// //   const [deptCount, setDeptCount] = useState(0);
// //   const [port, setPort] = useState(null);

// //   useEffect(() => {
// //     const fetchPort = async () => {
// //       try {
// //         const response = await axios.get('/getPort');
// //         setPort(response.data.port);
// //       } catch (error) {
// //         console.error('Error fetching port:', error);
// //         setPort(3001); // Default to port 3001 if fetching fails
// //       }
// //     };

// //     fetchPort();
// //   }, []);
// //   useEffect(() => {
// //     fetchDashboardCount();
// //   }, [port]);

// //   const fetchDashboardCount = async () => {
// //     try {
// //       const response = await axios.get(`http://localhost:${port}/dashboardCount`);
// //       console.log(response.data);
// //       setStaffCount(response.data.staffcount); 
// //       setDeptCount(response.data.deptcount); 
// //     } catch (error) {
// //       console.error("Error fetching counts:", error);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="container p-3 text-c">
// //         <span style={{ fontSize: "2em", fontWeight: "600" }}>Dashboard </span>
// //         <span style={{ fontSize: "1em" }}>Control panel</span>
// //       </div>
// //       <hr
// //         style={{
// //           position: "relative",
// //           bottom: "29px",
// //         }}
// //       />
// //       <div className="container my-2">
// //         <div className="row" style={{ transform: "translateY(-19px)" }}>
// //           <div className="col-sm-12 col-md-6 col-lg-3">
// //             <Card
// //               number={deptCount} 
// //               category="Department"
// //               cardbgcolor="blue"
// //             />
// //           </div>
// //           <div className="col-sm-12 col-md-6 col-lg-3">
// //             <Card
// //               number={staffCount} 
// //               category="Staff"
// //               cardbgcolor="rgb(88 13 51)"
// //             />
// //           </div>
// //           <div className="col-sm-12 col-md-6 col-lg-3">
// //             <Card
// //               number="0" 
// //               category="Leave Requests"
// //               cardbgcolor="#c70d0d"
// //             />
// //           </div>
// //           <div className="col-sm-12 col-md-6 col-lg-3">
// //             <Card
// //               number="$39640" 
// //               category="Salary Paid"
// //               cardbgcolor="green"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //       <Footer footerstyle="fixed-bottom" />
// //     </>
// //   );
// // };

// // export default Dashboard;
// import React, { useState, useEffect } from "react";
// import Card from "./Card";
// import Footer from "./Footer";
// import axios from "axios";

// const Dashboard = () => {
//   const [staffCount, setStaffCount] = useState(0);
//   const [deptCount, setDeptCount] = useState(0);
//   const [port, setPort] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchPort = async () => {
//   //     try {
//   //       const response = await axios.get('/getPort');
//   //       setPort(response.data.port);
//   //     } catch (error) {
//   //       console.error('Error fetching port:', error);
//   //       setPort(3001); // Default to port 3001 if fetching fails
//   //     }
//   //   };

//   //   fetchPort();
//   // }, []);

//   // useEffect(() => {
//   //   if (port) {
//   //     fetchDashboardCount();
//   //   }
//   // }, [port]);
//   useEffect(() => {
//     if (port) {
//       fetchDashboardCount();
//     }
//   }, [port, fetchDashboardCount]);
//   const fetchDashboardCountCallback = useCallback(fetchDashboardCount, []);

// useEffect(() => {
//   if (port) {
//     fetchDashboardCountCallback();
//   }
// }, [port, fetchDashboardCountCallback]);


//   const fetchDashboardCount = async () => {
//     try {
//       const response = await axios.get(`http://localhost:${port}/dashboardCount`);
//       console.log(response.data);
//       setStaffCount(response.data.staffcount || 0); 
//       setDeptCount(response.data.deptcount || 0); 
//     } catch (error) {
//       console.error("Error fetching counts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="container p-3 text-c">
//         <span style={{ fontSize: "2em", fontWeight: "600" }}>Dashboard </span>
//         <span style={{ fontSize: "1em" }}>Control panel</span>
//       </div>
//       <hr
//         style={{
//           position: "relative",
//           bottom: "29px",
//         }}
//       />
//       {loading && <div>Loading...</div>}
//       {!loading && (
//         <div className="container my-2">
//           <div className="row" style={{ transform: "translateY(-19px)" }}>
//             <div className="col-sm-12 col-md-6 col-lg-3">
//               <Card
//                 number={deptCount} 
//                 category="Department"
//                 cardbgcolor="blue"
//               />
//             </div>
//             <div className="col-sm-12 col-md-6 col-lg-3">
//               <Card
//                 number={staffCount} 
//                 category="Staff"
//                 cardbgcolor="rgb(88 13 51)"
//               />
//             </div>
//             <div className="col-sm-12 col-md-6 col-lg-3">
//               <Card
//                 number="0" 
//                 category="Leave Requests"
//                 cardbgcolor="#c70d0d"
//               />
//             </div>
//             <div className="col-sm-12 col-md-6 col-lg-3">
//               <Card
//                 number="$39640" 
//                 category="Salary Paid"
//                 cardbgcolor="green"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//       <Footer footerstyle="fixed-bottom" />
//     </>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import Footer from "./Footer";
import axios from "axios";

const Dashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [deptCount, setDeptCount] = useState(0);
  const [port, setPort] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardCount = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:${port}/dashboardCount`);
      console.log(response.data);
      setStaffCount(response.data.staffcount || 0); 
      setDeptCount(response.data.deptcount || 0); 
    } catch (error) {
      console.error("Error fetching counts:", error);
    } finally {
      setLoading(false);
    }
  }, [port]);

  useEffect(() => {
    const fetchPort = async () => {
      try {
        const response = await axios.get('/getPort');
        setPort(response.data.port);
      } catch (error) {
        console.error('Error fetching port:', error);
        setPort(3001); // Default to port 3001 if fetching fails
      }
    };

    fetchPort();
  }, []);

  useEffect(() => {
    if (port) {
      fetchDashboardCount();
    }
  }, [port, fetchDashboardCount]);

  return (
    <>
      <div className="container p-3 text-c">
        <span style={{ fontSize: "2em", fontWeight: "600" }}>Dashboard </span>
        <span style={{ fontSize: "1em" }}>Control panel</span>
      </div>
      <hr
        style={{
          position: "relative",
          bottom: "29px",
        }}
      />
      {loading && <div></div>}
      {!loading && (
        <div className="container my-2">
          <div className="row" style={{ transform: "translateY(-19px)" }}>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Card
                number={deptCount} 
                category="Department"
                cardbgcolor="blue"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Card
                number={staffCount} 
                category="Staff"
                cardbgcolor="rgb(88 13 51)"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Card
                number="0" 
                category="Leave Requests"
                cardbgcolor="#c70d0d"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Card
                number="$39640" 
                category="Salary Paid"
                cardbgcolor="green"
              />
            </div>
          </div>
        </div>
      )}
      <Footer footerstyle="fixed-bottom" />
    </>
  );
};

export default Dashboard;
