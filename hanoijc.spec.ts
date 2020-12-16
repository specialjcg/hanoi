


function playHanoi(numbers: number[][], start: number, end: number):number[][] {

    let tmp=numbers[start-1][0]

    let response:number[][]=[]
    numbers.forEach(val => response.push([...val]));

    if (((tmp < numbers[end-1][0]) ||numbers[end-1][0]===undefined)&&(start!==end)){
        if (tmp!==undefined){
        response[end-1].reverse().push(tmp)
        response[end-1].reverse()
        response[start-1].splice(0,1)}}else{
        return  numbers
    }
    return response;
}
interface ringHanoi{

    hanoi:number[][]
}
const hanoi:ringHanoi={hanoi:[[1,2,3],[],[]]}
let i1=0;
let listHanoiParcarcouru: ringHanoi[]=[];

function isEqual(b: ringHanoi, hanoi: ringHanoi) {

    return JSON.stringify(b.hanoi)===JSON.stringify(hanoi.hanoi);
}

function isInParcour(listHanoiParcarcouru: ringHanoi[], hanoi: ringHanoi) {
    return listHanoiParcarcouru.reduce((a,b)=>
        a||isEqual(b, hanoi), false)
}

function clone(listHanoiParcarcouru: ringHanoi[], hanoi: ringHanoi):ringHanoi[] {
    let listhanoi:ringHanoi= {hanoi:[]};
    hanoi.hanoi.forEach(val => listhanoi.hanoi.push([...val]));
    listHanoiParcarcouru.push(listhanoi);
   return listHanoiParcarcouru
}
function clonehanoi(hanoi: number[][]):ringHanoi {
    let listhanoi:ringHanoi= {hanoi:[]};
    hanoi.forEach(val => listhanoi.hanoi.push([...val]));
    return listhanoi;
}



function hanoiBestRoad(hanoi: ringHanoi,resultat:ringHanoi,listparcour:ringHanoi[]) {

    if (!isInParcour(listparcour,hanoi)){
        listparcour=clone(listparcour,hanoi);

    }


        for (let j = 1; j < 4; j++) {
            for (let i = 1; i < 4; i++) {
                if(i!==j && !isEqual(clonehanoi(playHanoi(hanoi.hanoi, j, i)),hanoi) ) {

                    let value = clonehanoi(playHanoi(hanoi.hanoi, j, i));
                    if (!isInParcour(listparcour,value)) {
                        listparcour = [...listparcour, value]
                        if (JSON.stringify(value.hanoi) === JSON.stringify(resultat.hanoi)) {

                            if (listparcour.length < min) {
                                min = listparcour.length;
                                listhanoimin = [...listparcour]



                            }


                        }

                        hanoi =clonehanoi(value.hanoi);

                        hanoiBestRoad(hanoi, resultat, listparcour);
                        listparcour=listparcour.filter((value1, index) => !isEqual(value1,hanoi))
                        hanoi=clonehanoi(playHanoi(hanoi.hanoi, i, j));
                    }

                }

            }

        }



    return {min,listhanoimin}

}
let min=50;
let listhanoimin: ringHanoi[]=[];
describe('test hanoi', () => {
    it('should transfert first ring 1 in rang1 to rang2 ', () => {
hanoi.hanoi=playHanoi(hanoi.hanoi, 1, 2)
expect(hanoi.hanoi).toStrictEqual([[2,3],[1],[]])
    });
    it('should transfert first ring 1 in rang2 to rang3 ', () => {
        hanoi.hanoi=playHanoi(hanoi.hanoi, 2, 3)
        expect(hanoi.hanoi).toStrictEqual([[2,3],[],[1]])
    });
    it('should transfert first ring 2 in rang1 to rang2 ', () => {
        hanoi.hanoi=playHanoi(hanoi.hanoi, 1, 2)
        expect(hanoi.hanoi).toStrictEqual([[3],[2],[1]])
    });
    it('should not  transfert first ring 3 in rang1 to rang2 ', () => {
        hanoi.hanoi=playHanoi(hanoi.hanoi, 1, 2)
        expect( hanoi.hanoi).toStrictEqual([[3],[2],[1]])
    });
    it('should   transfert first ring 1 in rang3 to rang1 ', () => {
        hanoi.hanoi=playHanoi(hanoi.hanoi, 3, 1)
        expect(hanoi.hanoi).toStrictEqual([[1,3],[2],[]])
    });

    it('should  not transfert first ring 2 in rang2 to rang1 ', () => {
        hanoi.hanoi=playHanoi(hanoi.hanoi, 2, 1)
        expect(hanoi.hanoi).toStrictEqual([[1,3],[2],[]])
    });
    it('should  transfert first ring 2 in rang2 to rang3 and ring1 to rang3 ', () => {
        let hanoi=[[1,2,3],[],[]]
        hanoi=playHanoi(hanoi, 1, 3)
        hanoi=playHanoi(hanoi, 1, 2)
        hanoi=playHanoi(hanoi, 3, 2)
        hanoi=playHanoi(hanoi, 1, 3)
        hanoi=playHanoi(hanoi, 2, 1)
        hanoi=playHanoi(hanoi, 3, 2)
        hanoi=playHanoi(hanoi, 2, 3)
        hanoi=playHanoi(hanoi, 1, 3)
        expect(hanoi).toStrictEqual([[],[],[1,2,3]])
    });
    it('should find the most road to goal for two ring', function () {
        let hanoi:ringHanoi={hanoi:[[1,2],[],[]]}
        let resultat:ringHanoi={hanoi:[[],[],[1,2]]}
        hanoiBestRoad(hanoi,resultat,[hanoi]).listhanoimin.map(val=>console.log(val.hanoi));
        expect(hanoiBestRoad(hanoi,resultat,[hanoi]).min).toEqual(4);
    });
    it('should find the most road to goal', function () {
        let hanoi:ringHanoi={hanoi:[[1,2,3],[],[]]}
        let resultat:ringHanoi={hanoi:[[],[],[1,2,3]]}
        hanoiBestRoad(hanoi,resultat,[hanoi]).listhanoimin.map(val=>console.log(val.hanoi));
        expect(hanoiBestRoad(hanoi,resultat,[hanoi]).min).toEqual(8);

    });
});
