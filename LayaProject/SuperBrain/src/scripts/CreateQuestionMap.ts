export default class CreateQuestionMap extends Laya.Script{
   
    private questionItem:Laya.Prefab;
    private groupObject:{[circle:string]:Laya.Image[]} = {};
   
    constructor(){
        super();
        /**
         * @prop {name:questionItem,tips:预制体,type:Prefab,default:null}
         */
        this.questionItem = null;
        this.groupObject = {};
    }

    onAwake(){
        super.onAwake();
        this.createMap(4);
    }

    private createMap(circleCount:number) {
        let centerX = Laya.stage.width / 2 - 74 / 2;
        let centerY = Laya.stage.height / 2 - 64 / 2;
        //生成中心块
        this.createItem(centerX,centerY);
        //生成外圈块
        for(let i = 1;i <= circleCount;i++){
            let sideCount = i + 1;
            // 先创建两边的块
            for(let j = 0;j < sideCount;j++){
                let leftOffsetX = centerX - i * 55;
                let rightOffsetX = centerX + i * 55;
                let offsetY = centerY - 32 * i + j * 64;
                this.createItem(leftOffsetX,offsetY);
                this.createItem(rightOffsetX,offsetY);
            }
            //创建上面和下面的块
            let topItem = this.questionItem.create();
            let bottomItem = this.questionItem.create();
            this.createItem(centerX,centerY - 64 * i);
            this.createItem(centerX,centerY + 64 * i);
            // 左上，左下，右上，右下
            for(let j = 0;j < i - 1; j++){
                // 左上
                let leftX = centerX - 55.5 * (i - 1 - j);
                let leftTopY = centerY - 32 * (i + 1 + j);
                this.createItem(leftX,leftTopY);
                // 左下
                let leftBomY = centerY + 32 * (i + 1 + j);
                this.createItem(leftX,leftBomY);
                // 右上
                let rightX = centerX + 55.5 * (i - 1 - j);
                let rightTopY = centerY - 32 * (i + 1 + j);
                this.createItem(rightX,rightTopY);
                // 右下
                let rightBomY = centerY + 32 * (i + 1 + j);
                this.createItem(rightX,rightBomY);
            }
        }
    }

    private createItem(x,y):Laya.Image {
        let item = this.questionItem.create();
        item.pos(x,y);
        this.owner.addChild(item);
        return item
    }

    private addItemToGroup(item:Laya.Image,circle:number):void{
        if(!this.groupObject[circle]) this.groupObject[circle] = new Array();
        this.groupObject[circle].push(item);
    }

    // private createMap():void{
    //     let offsetX = Laya.stage.width / 2 - 4 * 55 - 55 / 2;
    //     let offsetY = Laya.stage.height / 2 - 2 * 64 - 64 / 2;
    //     // y = 64 x = 55 yOffset = 32
    //     for(let i = 0;i < 9;i++){
    //         let ylimit = 0;
    //         // 0 1 2 3 4 5 6 7 8
    //         // 5 6 7 8 9 8 7 6 5
    //         if(i <= 4){
    //             ylimit = 5 + i;
    //         }else{
    //             ylimit = 13 - i;
    //         }
    //         let yOffset = (ylimit - 5) * 32;
    //         for(let j = 0;j < ylimit;j++){
    //             //创建预制体
    //             let item = this.questionItem.create();
    //             //添加预制体到页面上
    //             this.owner.addChild(item);
    //             //设置位置
    //             item.pos(i * 55 + offsetX,j * 64 - yOffset + offsetY);
    //         }
    //     }
    // }


}