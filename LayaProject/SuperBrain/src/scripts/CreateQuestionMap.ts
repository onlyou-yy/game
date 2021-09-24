import QuestionItem from "./QuestionItem";

export default class CreateQuestionMap extends Laya.Script{
   
    private questionItem:Laya.Prefab;
    private nextBtn:Laya.Button;

    /**按圈为key 保存每圈的方框组 */
    private groupObject:{[circle:string]:QuestionItem[]} = {};
    /**当前步骤 */
    private curStep:Step = Step.One;
    /**鼠标是否按下 */
    private isMouseDown:boolean = false;
    /**是否已完成出题 */
    private isFinish:boolean = false;
   
    constructor(){
        super();
        /**
         * @prop {name:questionItem,tips:预制体,type:Prefab,default:null}
         */
        this.questionItem = null;
        /**
         * @prop {name:nextBtn,tips:下一步按钮,type:Node,default:null}
         */
        this.nextBtn = null;
    }

    onAwake(){
        super.onAwake();
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.mouseUp,null);
        this.nextBtn.on(Laya.Event.CLICK,this,this.toNextStep,null);
        this.createMap(4);
    }

    /**创建面板底图 */
    private createMap(circleCount:number) {
        let centerX = Laya.stage.width / 2 - 74 / 2;
        let centerY = Laya.stage.height / 2 - 64 / 2;
        //生成中心块
        this.addItemToGroup(this.createItem(centerX,centerY,0),0);
        //生成外圈块
        for(let i = 1;i <= circleCount;i++){
            let sideCount = i + 1;
            // 先创建两边的块
            for(let j = 0;j < sideCount;j++){
                let leftOffsetX = centerX - i * 55;
                let rightOffsetX = centerX + i * 55;
                let offsetY = centerY - 32 * i + j * 64;
                this.addItemToGroup(this.createItem(leftOffsetX,offsetY,i),i);
                this.addItemToGroup(this.createItem(rightOffsetX,offsetY,i),i);
            }
            //创建上面和下面的块
            let topItem = this.questionItem.create();
            let bottomItem = this.questionItem.create();
            this.addItemToGroup(this.createItem(centerX,centerY - 64 * i,i),i);
            this.addItemToGroup(this.createItem(centerX,centerY + 64 * i,i),i);
            // 左上，左下，右上，右下
            for(let j = 0;j < i - 1; j++){
                // 左上
                let leftX = centerX - 55.5 * (i - 1 - j);
                let leftTopY = centerY - 32 * (i + 1 + j);
                this.addItemToGroup(this.createItem(leftX,leftTopY,i),i);
                // 左下
                let leftBomY = centerY + 32 * (i + 1 + j);
                this.addItemToGroup(this.createItem(leftX,leftBomY,i),i);
                // 右上
                let rightX = centerX + 55.5 * (i - 1 - j);
                let rightTopY = centerY - 32 * (i + 1 + j);
                this.addItemToGroup(this.createItem(rightX,rightTopY,i),i);
                // 右下
                let rightBomY = centerY + 32 * (i + 1 + j);
                this.addItemToGroup(this.createItem(rightX,rightBomY,i),i);
            }
        }
    }

    /**创建底图块 */
    private createItem(x:number,y:number,groupIndex:number):QuestionItem {
        let item = this.questionItem.create() as Laya.Image;
        item.pos(x,y);
        this.owner.addChild(item);
        let constr = item.getComponent(QuestionItem) as QuestionItem;//获取实例上挂载的其他组件，也可以是脚本组件
        constr.groupIndex = groupIndex;
        constr.mouseDownHandle = Laya.Handler.create(this,this.mouseDown,null,false);
        constr.mouseOverHandle = Laya.Handler.create(this,this.mouseOver,null,false);
        return constr;
    }

    /**按圈为key 保存每圈的方框 */
    private addItemToGroup(item:QuestionItem,groupIndex:number):void{
        if(!this.groupObject[groupIndex]) this.groupObject[groupIndex] = new Array();
        this.groupObject[groupIndex].push(item);
    }

    /**鼠标点击方块 
     * @param groupIndex
    */
    private mouseDown(groupIndex:number,item:QuestionItem):void{
        if(this.isFinish) return;
        if(this.curStep == Step.One){
            this.groupObject[groupIndex].forEach(item=>item.setInverColor());
        }else if(this.curStep == Step.Two){
            this.isMouseDown = true;
            item.setInverColor();
        }
    }

    /**
     * 鼠标移入方块 
     * @param item 方块脚本实例
     */
    private mouseOver(item:QuestionItem):void{
        if(this.isMouseDown && this.curStep == Step.Two){
            if(item.isThrough){
                this.isFinish = true;
                this.isMouseDown = false;
                console.log("不能走回头路");
                return;
            }
            item.setInverColor();
            item.isThrough = true;
        }
    }

    /**点击下一步 */
    private toNextStep():void{
        if(this.curStep == Step.One){
            this.curStep = Step.Two;
        }else if(this.curStep == Step.Two){
            this.curStep = Step.Three;
        }
    }

    /**鼠标抬起 */
    private mouseUp():void{
        this.isMouseDown = false;
        if(this.isMouseDown && this.curStep == Step.Two){
            this.isFinish = true;
        }
    }
}

/**出题步骤 */
enum Step{
    One = 1,
    Two,
    Three
}