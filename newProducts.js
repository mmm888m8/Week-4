import pagination from './pagination.js';
Vue.component('pagination', pagination);

var app =new Vue({
    el:'#product'
  ,data:{
    products: [],
    tempProduct: {imageUrl: ['']},
    token: '',
    paginationData: {},
  
    user: {
        token: '',
        uuid: 'a1c6ea73-ad09-423e-8d17-9b432e1283a7',
      },
  } ,
  created() {
    // 取得 token 的 cookies
    // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 若無法取得 token 則返回 Login 頁面
    if (this.user.token === '') {
      window.location = 'Login.html';
    }

    this.getProducts();
  },
  methods:{
    getProducts(page = 1) {
        this.tempProduct = {imageUrl: ['']};
        const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
        axios.get(api).then(res => {
            this.products = res.data.data;
            this.paginationData = res.data.meta.pagination;
        }).catch(err => {
            console.log(err);
        });
    },


    updateProduct() {
      if (this.tempProduct.id) {
          const id = this.tempProduct.id;
          this.products.forEach((item, i) => {
            if (item.id === id) {
              this.products[i] = this.tempProduct;
            }
          });
        } else {
          // Unix Timestamp
          const id = new Date().getTime();
          this.tempProduct.id = id;
          this.products.push(this.tempProduct);
        }
        this.tempProduct = {};
        $('#productModal').modal('hide');
      
      
      
      
      
      
    },
    delProduct(){
      if (this.tempProduct.id) {
          const id = this.tempProduct.id;
          this.products.forEach((item, i) => {
            if (item.id === id) {
              this.products.splice(i, 1);
              this.tempProduct = {};
            }
          });
         $('#delProductModal').modal('hide');
        }
      },
    openModal(option,item){
      switch (option){
          case 'new':
            this.tempProduct = {};
            $('#productModal').modal('show');
            break;
          case 'edit':
            this.tempProduct = Object.assign({}, item);//淺拷貝
            $('#productModal').modal('show');
            break;
          case 'delete':
            $('#delProductModal').modal('show');
            this.tempProduct = Object.assign({}, item);//淺拷貝
            break;
          default:
            break;
        }
    },  
  }
  
    
    
  });