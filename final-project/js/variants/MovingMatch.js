class MovingMatch extends Game {
  constructor() {
    super({
      key: `moving match`
      
    })


  }

  create() {
    super.create();

    for(let i  = 0; i< this.boxGroup.children.entries.length; i++){

      this.boxGroup.children.entries[i].setVelocity(0,-100);
      console.log(this.boxGroup.children.entries[i].body.velocity.y);
    }


  }
}
