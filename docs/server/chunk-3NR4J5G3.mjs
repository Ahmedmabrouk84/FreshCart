import './polyfills.server.mjs';
import{a as x}from"./chunk-UPZVLXEB.mjs";import{Bb as c,Cb as v,Cc as _,Fb as C,Ja as p,Na as a,P as l,V as o,Ya as f,Z as m,eb as g,kb as h,lb as u,mb as r,nb as s,ob as b}from"./chunk-NLDXJT5S.mjs";import"./chunk-VVCT4QZE.mjs";var y=(()=>{let t=class t{constructor(){this._HttpClient=o(_)}getAllBrands(){return this._HttpClient.get(`${x.baseUrl}/api/v1/brands`)}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=l({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var M=(e,t)=>t._id;function O(e,t){if(e&1&&(r(0,"div",3)(1,"div",4),b(2,"img",5),r(3,"h2",6),c(4),s()()()),e&2){let d=t.$implicit;a(2),g("src",d.image,p),a(2),v(d.name)}}var D=(()=>{let t=class t{constructor(){this._BrandsService=o(y),this.brandsList=f([])}ngOnInit(){this.brandsListSubscription=this._BrandsService.getAllBrands().subscribe({next:n=>{console.log(n.data),this.brandsList.set(n.data)},error:n=>{console.log(n)}})}ngOnDestroy(){this.brandsListSubscription.unsubscribe()}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=m({type:t,selectors:[["app-brands"]],standalone:!0,features:[C],decls:6,vars:0,consts:[[1,"my-3"],[1,""],[1,"row","g-4"],[1,"col-md-2","col-sm-6"],[1,"product","p-2","rounded","text-center"],["alt","",1,"w-100",3,"src"],[1,"h5","f-weight-600"]],template:function(i,S){i&1&&(r(0,"section",0)(1,"h1",1),c(2,"All Brands"),s(),r(3,"div",2),h(4,O,5,2,"div",3,M),s()()),i&2&&(a(4),u(S.brandsList()))},styles:['section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-weight:800;text-align:center;margin-block:1.4rem;position:relative}section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]:after{position:absolute;content:"";background-color:#0aad0a;width:3.125rem;height:.3125rem;border-bottom-right-radius:.625rem;border-top-left-radius:.625rem;left:46%;bottom:-.625rem;transition:.6s}section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]:hover:after{width:6.25rem}']});let e=t;return e})();export{D as BrandsComponent};