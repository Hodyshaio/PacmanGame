
class Point
{
    constructor(x, y)
    {
        this.X = x
        this.Y = y
        this.status = true
    }
    drowPoint(ctx)//מקבל את תוכן הקנבס
    {
        ctx.beginPath() //פתיחת ציור
        ctx.arc(this.X, this.Y, 5, 0, 2 * Math.PI)//הגדרות לנקודה
        ctx.fillStyle = "orange"//צבע נקודה
        ctx.fill()//תצייר
        ctx.closePath()//סגירת ציור
    }
}
class Game
{
    constructor()
    {
        this.flag = 1
        this.side2 = 0
        this.open = true
        //תמצא את הקנבס ותצייר בדו ממדי
        let ctx = document.querySelector('canvas').getContext('2d')
        this.points = [] //מערך של כל הנקודות
        for (let i = 30; i <= 760; i += 40)
            for (let j = 30; j <= 560; j += 40)
            {
                let p = new Point(i, j)//יוצר נקודה
                p.drowPoint(ctx)//שולח למחלקת הנקודה
                this.points.push(p)//מוסיף למערך הנקודות
            }
        this.X = 30//הגדרת מיקום לפקמן 
        this.Y = 30
        this.side = 39
        this.drowClose()//קריאה לפונקציה בתוך המחלקה
        this.drowOpen()
    }
    set Side(value) //ניתן להחליף צד רק כאשר הנקודה באמצע הפקמן סוג של בדיקת תקינות 
    {
        if ((((this.X - 30) % 40) == 0) &&((this.Y - 30) % 40) == 0)//אם ממוקם באמצע הנקודה
        {
            this.side = value
            this.side2 = 0
        }
        else
            this.side2 = value
    }
    drowClose()
    {
        let ctx = document.querySelector('canvas').getContext('2d')
        ctx.beginPath()
        ctx.arc(this.X, this.Y, 15, 0, 2 * Math.PI)
        ctx.fillStyle = 'grey'
        ctx.fill()
        ctx.closePath()
    }
    drowOpen()
    {
        let half1
        let half2

        switch (this.side)
        {
            case 39:
                {
                    half1 = 0.25
                    half2 = 0.75
                    break
                }

            case 40:
                {
                    half1 = 0.75
                    half2 = 1.25
                    break
                }
            case 37:
                {
                    half1 = 1.75
                    half2 = 1.25
                    break
                }
            case 38:
                {
                    half1 = 1.75
                    half2 = 0.25

                }
        }
        let ctx = document.querySelector('canvas').getContext('2d')
        ctx.beginPath()
        ctx.arc(this.X, this.Y, 15, half1 * Math.PI, (half1 + 1) * Math.PI)
        ctx.fillStyle = 'grey'
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.arc(this.X, this.Y, 15, half2 * Math.PI, (half2 + 1) * Math.PI)
        ctx.fillStyle = 'grey'
        ctx.fill()
        ctx.closePath()
    }
    clearBall()//מחיקת הנקודה
    {
        let ctx = document.querySelector('canvas').getContext('2d')
        ctx.clearRect(this.X - 15, this.Y - 15, 30, 30)
    }
    move()  //מוחק את הנקודה שמתחת לפקמן וזז ומחליף את הפקמן לפה פתוח
    {
        if (this.side2 != 0)
            this.Side = this.side2
        this.clearBall()
        switch (this.side)
        {
            case 39:
                if (this.X < 750)
                    this.X += 2
                break
            case 38:
                if (this.Y > 30)
                    this.Y -= 2
                break
            case 40:
                if (this.Y < 550)
                    this.Y += 2
                break
            case 37:
                if (this.X > 30)
                    this.X -= 2
                break
        }
        if (this.open) //מחליף בין פה פתוח לסגור
            this.drowOpen()
        else
            this.drowClose()
    }
}