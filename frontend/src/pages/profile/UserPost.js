// import React, { useState } from 'react';
// import UserWonProducts from './Winning';
// import UserCreatedProducts from './Created';

// function UserPost ()  {
//   const [activeTab, setActiveTab] = useState('owned');

//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//   };

//   return (
//     <div>
//       <div className="rn-authore-profile-area">
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="tab-wrapper-one">
//                 <nav className="tab-button-one">
//                   <div className="nav nav-tabs" id="nav-tab" role="tablist">
                   
//                     <button
//                       className={`nav-link ${activeTab === 'owned' ? 'active' : ''}`}
//                       onClick={() => handleTabClick('owned')}
//                     >
//                       Owned
//                     </button>
//                     <button
//                       className={`nav-link ${activeTab === 'created' ? 'active' : ''}`}
//                       onClick={() => handleTabClick('created')}
//                     >
//                       Created
//                     </button>
                   
//                   </div>
//                 </nav>
//               </div>
//             </div>
//           </div>
//           <div className="tab-content">
            
//             {activeTab === 'owned' && (
//               <div className="tab-pane show active" id="nav-profile" role="tabpanel" >
//                 <UserWonProducts />
//               </div>
//             )}
//             {activeTab === 'created' && (
//               <div className="tab-pane" id="nav-contact" role="tabpanel">
//                 <UserCreatedProducts />
//               </div>
//             )}
           
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPost;

