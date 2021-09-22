export default class CreateQuestionMap extends Laya.Script{
   
    private questionItem:Laya.Prefab = null;
   
    constructor(){
        super();
        /**
         * @prop {name:questionItem,tips:预制体,type:Prefab,default:null}
         */
        this.questionItem = null;
    }

    onAwake(){
        super.onAwake();
        this.createMap(4);
    }

    private createMap(circleCount:number) {
        let centerX = Laya.stage.width / 2 - 74 / 2;
        let centerY = Laya.stage.height / 2 - 64 / 2;
        //生成中心块
        let centerItem = this.questionItem.create();
        centerItem.pos(centerX,centerY);
        this.owner.addChild(centerItem);

        //生成外圈块
        for(let i = 1;i <= circleCount;i++){
            let sideCount = i + 1;
            // 先创建两边的块
            for(let j = 0;j < sideCount;j++){
                let leftOffsetX = centerX - i * 55;
                let rightOffsetX = centerX + i * 55;
                let offsetY = centerY - 32 * i + j * 64;
                let leftItem = this.questionItem.create();
                let rightItem = this.questionItem.create();
                leftItem.pos(leftOffsetX,offsetY);
                this.owner.addChild(leftItem);
                rightItem.pos(rightOffsetX,offsetY);
                this.owner.addChild(rightItem);
            }
            //创建上面和下面的块
            let topItem = this.questionItem.create();
            let bottomItem = this.questionItem.create();
            topItem.pos(centerX,centerY - 64 * i);
            bottomItem.pos(centerX,centerY + 64 * i);
            this.owner.addChild(topItem);
            this.owner.addChild(bottomItem);
            
        }
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