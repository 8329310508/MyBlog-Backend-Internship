using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            a = a * a;
            MessageBox.Show(a.ToString());
        }

        private void button2_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            if (a % 2 == 0)
            {
                MessageBox.Show("Number is Even");
            }
            else
            {
                MessageBox.Show("Number is odd");
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            if (a > 0)
            {
                MessageBox.Show("Number is positive");
            }
            else
            {
                MessageBox.Show("Number is negative");
            } 
        }

        private void button4_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            int original = a;
            int rev = 0;
            while (a > 0)
            {
                int digit = a % 10;
                rev = rev * 10 + digit;
                a = a / 10;
            }
            if(original ==rev)
                MessageBox.Show("Number is palindrome");
            else
                MessageBox.Show("Number is not palindrome");
        }

        private void button5_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            int original = a;
            int sum = 0;
            while (a > 0)
            {
                int digit = a % 10;
                sum = sum + (digit * digit * digit);
                a = a / 10;
            }
            if(original ==sum)
                MessageBox.Show("armstrong");
            else
                MessageBox.Show("Not armstrong");
        }

        private void button7_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            int sum = 0;
            while (a > 0)
            {
                int digit = a % 10;
                sum = sum + digit;
                a = a / 10;
            }
            MessageBox.Show("Sum="+sum);
        }

        private void button8_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            a = a * a * a;
            MessageBox.Show(a.ToString());
        }

        private void button9_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            int rev = 0;
            while (a > 0)
            {
                int digit = a % 10;
                rev = rev * 10 + digit;
                a = a / 10;
            }
            MessageBox.Show("Reverse="+rev);
            
        }

        private void button10_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            int sum = 0;
            for (int i = 1; i < a; i++)
            {
                if (a % i == 0)
                {
                    sum = sum  + i;
                }
            }
            if(sum==a)
                MessageBox.Show("perfect number");
            else
                MessageBox.Show("Not perfect number");
        }

        private void button6_Click(object sender, EventArgs e)
        {
            int a = Convert.ToInt32(textBox1.Text);
            int count = 0;
            for (int i = 1; i <= a; i++)
            {
                if (a % i == 0)
                {
                    count++;
                }
            }
            if (count == 2)
            {
                MessageBox.Show("prime number");
            }
            else
            {
                MessageBox.Show("Not prime number");
            }
            
        }
    }
}
