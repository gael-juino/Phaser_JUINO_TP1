var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var score = 0;

var platforms;
var player;
var cursors; 
var stars;
var scoreText;
var bomb;
var slime;
var vie;
var nVie = 3;


function preload(){
    this.load.image('Zone1','assets/Zone1.png'); 
    this.load.spritesheet('gabe','assets/gabe.png',{frameWidth: 23, frameHeight: 23});
    this.load.spritesheet('green-slime','assets/slime-green.png',{frameWidth: 16, frameHeight: 24});

}



function create(){
    this.add.image(400,300,'Zone1');

    platforms = this.physics.add.staticGroup();
    platforms.create(85,506,'mur').setScale(6,2).refreshBody();
    platforms.create(194,390,'mur').setScale(1,10).refreshBody();
    platforms.create(50,312,'mur').setScale(3,7).refreshBody();
    platforms.create(185,145,'mur').setScale(10,3).refreshBody();
    platforms.create(470,95,'mur').setScale(9,1).refreshBody();
    platforms.create(628,253,'mur').setScale(1,10).refreshBody();
    platforms.create(528,310,'mur').setScale(1,9).refreshBody();
    platforms.create(660,470,'mur').setScale(9,1).refreshBody();
    platforms.create(308,245,'mur').setScale(6,1).refreshBody();
    platforms.create(420,213,'mur').setScale(1,3).refreshBody();
    platforms.create(470,182,'mur').setScale(3,1).refreshBody();
    platforms.create(720,399,'mur').setScale(5,1).refreshBody();
    platforms.setAlpha(0);


    player = this.physics.add.sprite(10,450,'gabe');
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    this.physics.add.collider(player,platforms);
    

    slime = this.physics.add.sprite(135,300,'green-slime');
    slime.setCollideWorldBounds(true);
    slime.setBounce(0.2);
    this.physics.add.collider(slime,platforms);
    this.physics.add.overlap(slime, player, hitPlayer, null, this);
    
    cursors = this.input.keyboard.createCursorKeys(); 
    
    this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('gabe', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key:'stop',
        frames: [{key: 'gabe', frame:4}],
        frameRate: 20
    });
    
}



function update(){
    if(cursors.left.isDown){
        player.anims.play('left', true);
        player.setVelocityX(-300);
        player.setFlipX(true);
    }else if(cursors.right.isDown){
        player.setVelocityX(300);
        player.anims.play('left', true);
        player.setFlipX(false);
    }else if(cursors.up.isDown){
        player.setVelocityY(-300);
        player.anims.play('left', true);
        player.setFlipX(false);  
    }else if(cursors.down.isDown){
        player.setVelocityY(300);
        player.anims.play('left', true);
        player.setFlipX(false);   
    
    }else{
        player.anims.play('stop', true);
        player.setVelocityX(0);
        player.setVelocityY(0);
    }
    
    if(cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330);
    } 

   
}

function collectStar(player, star){
    star.disableBody(true,true);
    score += 10;
    scoreText.setText('score: '+score);
    if(stars.countActive(true)===0){
        stars.children.iterate(function(child){
            child.enableBody(true,child.x,0, true, true);
        });
        
        var x = (player.x < 400) ? 
            Phaser.Math.Between(400,800):
            Phaser.Math.Between(0,400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

}


function hitPlayer(slime, player) {
    console.log("Touché");
}