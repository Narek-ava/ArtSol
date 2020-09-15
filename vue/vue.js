let app = new Vue({
    el: '#app',
    data: {
        title: 'FetchVue',
        urlUsers: "https://jsonplaceholder.typicode.com/users",
        users: [],
        errors: []
    },
    async mounted() {
        try {
            const response = await fetch(this.urlUsers);
            const result = await response.json();
            this.users.push(...result);
            console.log(this.users);
        } catch (error) {
            this.errors.push(error);
        }
    }
});
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});

// var app7 = new Vue({
//     el: '#app-7',
//     data: {
//         groceryList: [
//             { id: 0, text: 'tes1' },
//             { id: 1, text: 'test2' },
//             { id: 2, text: 'test3' }
//         ]
//     }
// });
// // 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// // and then call `Vue.use(VueRouter)`.
//
// // 1. Define route components.
// // These can be imported from other files
// const Foo = { template: '<div><input placeholder="Login"><br><input placeholder="Password"><br><button>submit</button></div>' };
// //const Bar = { template: '<div>bar</div>' };
//
// // 2. Define some routes
// // Each route should map to a component. The "component" can
// // either be an actual component constructor created via
// // `Vue.extend()`, or just a component options object.
// // We'll talk about nested routes later.
// const routes = [
//     { path: '/foo', component: Foo },
//     //{ path: '/bar', component: Bar }
// ];
//
// // 3. Create the router instance and pass the `routes` option
// // You can pass in additional options here, but let's
// // keep it simple for now.
// const router = new VueRouter({
//     routes // short for `routes: routes`
// });
//
// // 4. Create and mount the root instance.
// // Make sure to inject the router with the router option to make the
// // whole app router-aware.
// const app = new Vue({
//     router
// }).$mount('#app');
// $('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:10,
//     nav:true,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:3
//         },
//         1000:{
//             items:5
//         }
//     }
// })