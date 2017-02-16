var vm = new Vue({
    el:'#simpleCalculator',
    data:{
        current_result:'0',
        first_num:'',
        second_num:'',
        mark:''
    },
    methods:{
        checkPoint:function(str){
            var reg = /^\d+\.{1}\d+$/;
            return reg.test(str.toString());
        },
        checkMarkAndRun:function(){
            /* 经过运算后 mark 标记为 null */
            if((this.second_num!=='')){
                if(this.mark==='*'){
                    this.first_num = this.current_result = parseFloat(this.first_num) * parseFloat(this.second_num);
                    this.mark = null;
                }
                if((this.mark==='/')){
                    if(parseFloat(this.second_num)===0){
                        this.current_result = 'Error';
                        this.first_num = '';
                        this.second_num = '';
                        this.mark = null;
                        return false;
                    }
                    this.first_num = this.current_result = parseFloat(this.first_num) / parseFloat(this.second_num);
                }
                if(this.mark==='+'){
                    this.first_num = this.current_result = parseFloat(this.first_num) + parseFloat(this.second_num);
                }
                if(this.mark==='-'){
                    this.first_num = this.current_result = parseFloat(this.first_num) - parseFloat(this.second_num);
                }
                this.mark = null;
                this.second_num = '';
            }
        },
        clear:function(){
            this.current_result = '0';
            this.first_num = '';
            this.second_num = '';
            this.mark = '';
        },
        delete:function(){
            this.current_result = this.current_result.toString();
            if(this.current_result.length > 0){
                this.current_result = this.current_result.substring(0, this.current_result.length-1);
                if((this.mark===null)||(this.mark==='')){
                    this.first_num = this.current_result;
                }else {
                    this.second_num = this.current_result;
                }
                if(this.current_result==='') this.current_result = 0;
            }
        },
        operator:function(mark){
            this.checkMarkAndRun();
            if(this.first_num!==''){
                this.mark = mark;
            }else {
                this.clear();
            }
        },
        save:function(num){
            if((num==='.')&&(this.checkPoint(this.first_num))){
                return false;
            }
            if(this.mark===''){
                this.current_result = this.first_num = this.first_num.toString()+num;
            }else{
                this.current_result = this.second_num = this.second_num.toString()+num;
            }

        },
        calculate:function(){
            this.checkMarkAndRun();
        }
    }
});
