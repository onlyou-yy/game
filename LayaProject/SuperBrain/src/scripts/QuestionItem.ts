import Utils from "./Utils";

export default class QuestionItem extends Laya.Script {
    
    /**当前方块所在圈 */
    public groupIndex:number = -1;
    /**当前方块鼠标按下处理 */
    public mouseDownHandle:Laya.Handler;
    /**当前方块鼠标移入处理 */
    public mouseOverHandle:Laya.Handler;
    /**是否已经被移入过 */
    public isThrough:boolean = false;

    private isWhite:boolean = true;
    constructor() { super(); }
    
    onAwake(){
        super.onAwake();
        this.owner.on(Laya.Event.MOUSE_DOWN,this,this.clickItem,null);
        this.owner.on(Laya.Event.MOUSE_OVER,this,this.overItem,null);
    }

    /**鼠标点击事件处理 */
    private clickItem():void{
        if(this.mouseDownHandle){
            this.mouseDownHandle.runWith([this.groupIndex,this]);
        }
    }

    /**鼠标移入事件处理  */
    private overItem():void{
        if(this.mouseOverHandle){
            this.mouseOverHandle.runWith([this]);
        }
    }

    /**设置反色 */
    public setInverColor():void{
        this.isWhite = !this.isWhite;
        let item = this.owner as Laya.Image;
        item.skin = this.isWhite ? Utils.getCompSkin("white") : Utils.getCompSkin("black");
    }
}