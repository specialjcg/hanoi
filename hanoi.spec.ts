enum Slot {
    FIRST = "FIRST",
    LAST = "LAST",
    MIDDLE = "MIDDLE",

}

type Ring = number;

class Stack {
    stack: Ring[] = [];

    constructor(size: number) {
        this.stack = Array(size).fill(0).map((_, index) => size - index)

    }

    static fill(size: number) {
        return new Stack(size);
    }

    top(): Ring | undefined {
        return this.get()[0];

    }

    add(ring: Ring) {
        if (this.top() <= ring) throw new Error();
        this.stack.push(ring);
    }

    get(): Ring[] {
        return this.stack.slice().reverse();
    }

    pop(): Ring {
        if (this.empty()) throw new Error();
        return this.stack.pop();
    }

    empty(): boolean {
        return this.stack.length === 0;
    }
}

class Hanoi {
    private readonly lastSlot: Stack;
    private readonly middleSlot: Stack;
    private readonly firstSlot: Stack;

    constructor(private size: number) {
        this.firstSlot = Stack.fill(size);
        this.middleSlot = Stack.fill(0);
        this.lastSlot = Stack.fill(0);
    }


    static from(size: number) {
        return new Hanoi(size)
    }


    step(): Step {
        if (this.size % 2 === 0) {
            return {from: Slot.FIRST, to: Slot.MIDDLE}
        }
        return {from: Slot.FIRST, to: Slot.LAST};
    }

    state(): any {
        return {
            [Slot.FIRST]: this.firstSlot.get(),
            [Slot.MIDDLE]: this.middleSlot.get(),
            [Slot.LAST]: this.lastSlot.get()


        };
    }

    move(start: Slot, end: Slot) {
        this.stackFrom(end).add(this.stackFrom(start).pop());
    }

    win() {
        return this.firstSlot.empty() && this.middleSlot.empty();
    }

    private stackFrom(slot: Slot): Stack {
        if (slot === Slot.FIRST) {
            return this.firstSlot
        }
        if (slot === Slot.MIDDLE) {
            return this.middleSlot
        }
        return this.lastSlot

    }
}

interface Step {
    from: Slot;
    to: Slot;
}

type PurposeKeys = "start" | "intermediate" | "destination"

type Purpose = Record<PurposeKeys, Slot>;
const resolveHanoi = (number: number, purpose: Purpose = {
    start: Slot.FIRST,
    intermediate: Slot.MIDDLE,
    destination: Slot.LAST
}): Step[] => {
    return []
}

// const resolveHanoi = (number: number, purpose: Purpose = {
//     start: Slot.FIRST,
//     intermediate: Slot.MIDDLE,
//     destination: Slot.LAST
// }): Step[] => {
//     if (number === 0) {
//         return []
//     }
//     return [
//         ...resolveHanoi(number - 1, {
//             start: purpose.start,
//             intermediate: purpose.destination,
//             destination: purpose.intermediate
//         }),
//         {from: purpose.start, to: purpose.destination},
//         ...resolveHanoi(number - 1, {
//             start: purpose.intermediate,
//             intermediate: purpose.start,
//             destination: purpose.destination
//         }),
//     ]
//
//
// };

describe('resolve tower of hanoi', () => {
    describe('Step to resolve', () => {
        it('should predict the first step for size odd', () => {
            expect(Hanoi.from(3).step()).toEqual({from: Slot.FIRST, to: Slot.LAST});

        });
        it('should predict the first step for size even', () => {
            expect(Hanoi.from(2).step()).toEqual({from: Slot.FIRST, to: Slot.MIDDLE});

        });


    });
    describe('stack', () => {
        it('should not allow stacking bigger ring', () => {
            const stack = Stack.fill(0);
            stack.add(3);
            expect(() => stack.add(4)).toThrow();
        });
        it('should allow stacking lesser ring', () => {
            const stack = Stack.fill(0);
            stack.add(3);
            stack.add(2);
            expect(stack.get()).toEqual([2, 3]);
        });
        it('should not allow stacking same ring', () => {
            const stack = Stack.fill(0);
            stack.add(3);
            expect(() => stack.add(3)).toThrow();
        });
        it('should fill stack of five', () => {
            const stack = Stack.fill(5);
            expect(stack.get()).toEqual([1, 2, 3, 4, 5]);
        });
        it('should fill stack of five', () => {
            const stack = Stack.fill(3);
            expect(stack.pop()).toBe(1);
            expect(stack.get()).toEqual([2, 3]);
        });
        it('should not pop when  empty', () => {
            const stack = Stack.fill(0);
            expect(() => stack.pop()).toThrow()
        });
        it('should stack several rings', () => {
            const stack = Stack.fill(0);
            stack.add(5);
            stack.add(4);
            stack.add(3);
            expect(stack.get()).toEqual([3, 4, 5])
        });
    });

    describe('Hanoi', () => {
        it('should move from slot first to slot middle', () => {
            const startGame = new Hanoi(5);
            startGame.move(Slot.FIRST, Slot.MIDDLE);
            expect(startGame.state()).toEqual(
                {
                    [Slot.FIRST]: [2, 3, 4, 5],
                    [Slot.MIDDLE]: [1],
                    [Slot.LAST]: [],
                }
            )
        });
        it('should move from slot first to slot last', () => {
            const startGame = new Hanoi(5);
            startGame.move(Slot.FIRST, Slot.LAST);
            expect(startGame.state()).toEqual(
                {
                    [Slot.FIRST]: [2, 3, 4, 5],
                    [Slot.MIDDLE]: [],
                    [Slot.LAST]: [1],
                }
            )
        });
        it('should not move a bigger ring above a smaller ring', () => {
            const startGame = new Hanoi(5);
            startGame.move(Slot.FIRST, Slot.LAST);
            expect(() => startGame.move(Slot.FIRST, Slot.LAST)).toThrow();

        });

        it('should win hanoi with several move', () => {
            const startGame = new Hanoi(3);
            startGame.move(Slot.FIRST, Slot.LAST);
            startGame.move(Slot.FIRST, Slot.MIDDLE);
            startGame.move(Slot.LAST, Slot.MIDDLE);
            startGame.move(Slot.FIRST, Slot.LAST);
            startGame.move(Slot.MIDDLE, Slot.FIRST);
            startGame.move(Slot.MIDDLE, Slot.LAST);
            startGame.move(Slot.FIRST, Slot.LAST);

            expect(startGame.state()).toEqual(
                {
                    [Slot.FIRST]: [],
                    [Slot.MIDDLE]: [],
                    [Slot.LAST]: [1, 2, 3],
                }
            )
            expect(startGame.win()).toBeTruthy();
        });
        it('should not win hanoi when first slot is not empty', () => {
            const startGame = new Hanoi(1);
            expect(startGame.win()).toBeFalsy();
        });
        it('should not win hanoi when middle slot is not empty', () => {
            const startGame = new Hanoi(1);
            startGame.move(Slot.FIRST, Slot.MIDDLE);
            expect(startGame.win()).toBeFalsy();
        });


    });
    describe('hanoi resolution', () => {
        it('should have no step with no ring', () => {

            expect(resolveHanoi(0)).toHaveLength(0);

        });
        it('should resolve with one ring', () => {

            expect(resolveHanoi(1)).toEqual<Step[]>([{from: Slot.FIRST, to: Slot.LAST}]);

        });
        it('should resolve with two ring', () => {

            expect(resolveHanoi(2)).toEqual<Step[]>([{from: Slot.FIRST, to: Slot.MIDDLE}, {
                from: Slot.FIRST,
                to: Slot.LAST
            }, {from: Slot.MIDDLE, to: Slot.LAST}]);

        });
        it('should resolve with three ring', () => {

            expect(resolveHanoi(3)).toEqual<Step[]>([
                {from: Slot.FIRST, to: Slot.LAST},
                {from: Slot.FIRST, to: Slot.MIDDLE},
                {from: Slot.LAST, to: Slot.MIDDLE},
                {from: Slot.FIRST, to: Slot.LAST},
                {from: Slot.MIDDLE, to: Slot.FIRST},
                {from: Slot.MIDDLE, to: Slot.LAST},
                {from: Slot.FIRST, to: Slot.LAST},
            ]);

        });
        it('should manage big hanoi', () => {

            expect(() => resolveHanoi(10000000)).not.toThrow();

        });

    });
});
