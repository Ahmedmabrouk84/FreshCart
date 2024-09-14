import './polyfills.server.mjs';
import{a as Y}from"./chunk-BI36TVHM.mjs";import{a as q,b as _,c as R,d as I,e as D,f as E,g as L,h as G,i as k,l as V}from"./chunk-6RO7PS6K.mjs";import"./chunk-EMJPZWYO.mjs";import"./chunk-UPZVLXEB.mjs";import{h as N}from"./chunk-OSVV6JAO.mjs";import{Bb as m,Fb as P,Ib as b,Na as a,V as S,Z as w,cb as p,eb as C,ib as c,mb as o,nb as n,ob as y,oc as x,sa as F,tb as M,ub as O,xc as A}from"./chunk-NLDXJT5S.mjs";import"./chunk-VVCT4QZE.mjs";var T=(t,i)=>({"is-valid":t,"is-invalid":i});function $(t,i){t&1&&(o(0,"p",12),m(1,"details is Required"),n())}function B(t,i){t&1&&(o(0,"p",12),m(1," INformation Should Be At Least 3 Characters "),n())}function j(t,i){if(t&1&&(o(0,"div",6),p(1,$,2,0,"p",12)(2,B,2,0),n()),t&2){let l,r=O();a(),c(1,(l=r.orders.get("details"))!=null&&l.getError("required")?1:(l=r.orders.get("details"))!=null&&l.getError("pattern")?2:-1)}}function z(t,i){t&1&&(o(0,"p",12),m(1,"phone is Required"),n())}function W(t,i){t&1&&(o(0,"p",12),m(1,"Accept only egypt phone numbers"),n())}function H(t,i){if(t&1&&(o(0,"div",6),p(1,z,2,0,"p",12)(2,W,2,0),n()),t&2){let l,r=O();a(),c(1,(l=r.orders.get("phone"))!=null&&l.getError("required")?1:(l=r.orders.get("phone"))!=null&&l.getError("pattern")?2:-1)}}function J(t,i){t&1&&(o(0,"p",12),m(1,"Your City is required"),n())}function K(t,i){t&1&&(o(0,"p",12),m(1," Should Write Your City To get Your Orders "),n())}function Q(t,i){if(t&1&&(o(0,"div",6),p(1,J,2,0,"p",12)(2,K,2,0),n()),t&2){let l,r=O();a(),c(1,(l=r.orders.get("city"))!=null&&l.getError("required")?1:(l=r.orders.get("city"))!=null&&l.getError("pattern")?2:-1)}}function U(t,i){t&1&&(o(0,"span"),y(1,"i",13),n())}var le=(()=>{let i=class i{constructor(){this._OrderService=S(Y),this._ActivatedRoute=S(N),this._PLATFORM_ID=S(F),this.isLodaing=!1,this.CartId="",this.orders=new D({details:new E(null,[_.required,_.pattern(/^.{3,} *$/)]),phone:new E(null,[_.required,_.pattern(/^01[0125][0-9]{8}$/)]),city:new E(null,[_.required,_.pattern(/^\w{3,}$/)])})}ngOnInit(){this._ActivatedRoute.paramMap.subscribe({next:r=>{console.log(r),this.CartId=r.get("id")}})}orderSubmit(){console.log(this.orders.value),this._OrderService.checkoutSession(this.CartId,this.orders.value).subscribe({next:r=>{console.log(r),r.status==="success"&&A(this._PLATFORM_ID)&&window.open(r.session.url,"_self")}})}};i.\u0275fac=function(v){return new(v||i)},i.\u0275cmp=w({type:i,selectors:[["app-orders"]],standalone:!0,features:[P],decls:22,vars:18,consts:[[1,"bg-main-light","w-75","mx-auto","my-4","rounded-4","shadow","p-4"],[1,"h2","f-weight-800","text-center","text-main"],[3,"ngSubmit","formGroup"],[1,"my-2"],["for","details"],["id","details","formControlName","details","id","details","type","details",1,"form-control","mt-1",3,"ngClass"],[1,"alert","alert-danger"],["for","phone"],["formControlName","phone","id","phone","type","tel",1,"form-control","mt-1",3,"ngClass"],["for","city"],["id","city","formControlName","city","id","city","type","text",1,"form-control","mt-1",3,"ngClass"],[1,"btn-main","d-block","mx-auto","mt-3","f-weight-600",3,"disabled"],[1,"m-0","text-capitalize"],[1,"fas","fa-spin","fa-spinner","ps-1"]],template:function(v,e){if(v&1&&(o(0,"section",0)(1,"h1",1),m(2,"Shipping Address"),n(),o(3,"form",2),M("ngSubmit",function(){return e.orderSubmit()}),o(4,"div",3)(5,"label",4),m(6,"details"),n(),y(7,"textarea",5),p(8,j,3,1,"div",6),n(),o(9,"div",3)(10,"label",7),m(11,"Phone"),n(),y(12,"input",8),p(13,H,3,1,"div",6),n(),o(14,"div",3)(15,"label",9),m(16,"City"),n(),y(17,"input",10),p(18,Q,3,1,"div",6),n(),o(19,"button",11),m(20," Check Order "),p(21,U,2,0,"span"),n()()()),v&2){let d,g,s,f,u,h;a(3),C("formGroup",e.orders),a(4),C("ngClass",b(9,T,!((d=e.orders.get("details"))!=null&&d.errors)&&(((d=e.orders.get("details"))==null?null:d.touched)||((d=e.orders.get("details"))==null?null:d.dirty)),((d=e.orders.get("details"))==null?null:d.errors)&&(((d=e.orders.get("details"))==null?null:d.touched)||((d=e.orders.get("details"))==null?null:d.dirty)))),a(),c(8,(g=e.orders.get("details"))!=null&&g.errors&&((g=e.orders.get("details"))!=null&&g.touched||(g=e.orders.get("details"))!=null&&g.dirty)?8:-1),a(4),C("ngClass",b(12,T,!((s=e.orders.get("phone"))!=null&&s.errors)&&(((s=e.orders.get("phone"))==null?null:s.touched)||((s=e.orders.get("phone"))==null?null:s.dirty)),((s=e.orders.get("phone"))==null?null:s.errors)&&(((s=e.orders.get("phone"))==null?null:s.touched)||((s=e.orders.get("phone"))==null?null:s.dirty)))),a(),c(13,(f=e.orders.get("phone"))!=null&&f.errors&&((f=e.orders.get("phone"))!=null&&f.touched||(f=e.orders.get("phone"))!=null&&f.dirty)?13:-1),a(4),C("ngClass",b(15,T,!((u=e.orders.get("city"))!=null&&u.errors)&&(((u=e.orders.get("city"))==null?null:u.touched)||((u=e.orders.get("city"))==null?null:u.dirty)),((u=e.orders.get("city"))==null?null:u.errors)&&(((u=e.orders.get("city"))==null?null:u.touched)||((u=e.orders.get("city"))==null?null:u.dirty)))),a(),c(18,(h=e.orders.get("city"))!=null&&h.errors&&((h=e.orders.get("city"))!=null&&h.touched||(h=e.orders.get("city"))!=null&&h.dirty)?18:-1),a(),C("disabled",e.orders.invalid||e.isLodaing),a(2),c(21,e.isLodaing?21:-1)}},dependencies:[x,V,L,q,R,I,G,k],styles:['section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center;position:relative}section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]:after{position:absolute;content:"";background-color:#0aad0a;width:5rem;height:.3125rem;border-bottom-right-radius:.625rem;border-top-left-radius:.625rem;left:43%;bottom:-.9375rem;transition:.6s}section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]:hover:after{width:7.5rem}']});let t=i;return t})();export{le as OrdersComponent};