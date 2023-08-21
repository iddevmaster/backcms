// const route = useRouter();

// export default defineNuxtRouteMiddleware((store, route) => {

//   const allowedRoles = route.meta.meta.allowedRoles;
//   console.log('allowedRoles',allowedRoles);

// })


export default defineNuxtRouteMiddleware((to, from) => {
  console.log('to',to);
  const allowedRoles = from.meta.allowedRoles;
  console.log('from',allowedRoles);
  var user_type = "IT"; // get token from cookies



    if (!allowedRoles.includes(user_type)) {
    // User doesn't have the required role for this route
console.log('unauthorized');
   // return navigateTo('/unauthorized');
  }
 // const allowedRoles = route.meta.allowedRoles;
 // console.log('allowedRoles',allowedRoles);
  });
// export default defineNuxtRouteMiddleware((store, route) => {

//  var user_type = "IT"; // get token from cookies

//  const rou = [{
//   name: 'course',
//   path: '/course',
//   allowedRoles: ['admin', 'user'],
// }, {
//   name: 'course-create',
//   path: '/course/create',
//   allowedRoles: ['admin'],
// }]

//       for (let i = 0; i < rou.length; i++) {
//         console.log(rou[i].name);
//         if (rou[i].name === route.name) {
//       console.log('if',rou[i].allowedRoles);
//          break;
//         }
//       }
//       console.log('ทำต่อ');


// //   if (!allowedRoles || !user_type) {
// //  return true;
// //   }

// //   if (!allowedRoles.includes(user_type)) {
// //     console.log('if2');
// //   }

// //   if (!allowedRoles.includes(user_type)) {
// //     // User doesn't have the required role for this route
// // console.log('sssssssssssss');
// //     return navigateTo('/unauthorized');
// //   }
//   })