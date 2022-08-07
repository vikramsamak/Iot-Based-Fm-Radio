import ttkbootstrap as ttk
from ttkbootstrap.constants import *
import requests


def connect():
    global ip
    ip = ipentry.get()
    if len(ip) < 13:
        ipentry.delete(0, END)
        ipentry.insert(0, "Please Enter Valid IP Address Here!")
    elif len(ip) == 13:
        frequencyslider.config(state="active")


def frequency_set(self):
    try:
        if len(ip) == 13:
            frequencyslider.config(state="active")
            frequency = frequencyslider.get()
            frequency = round(frequency, 1)
            if frequency == 93.5:
                freq_label.config(text="Red FM", font=(
                    "Arial", 25), justify='center')
            elif frequency == 91.1:
                freq_label.config(text="Radio City", font=(
                    "Arial", 25), justify='center')
            elif frequency == 94.3:
                freq_label.config(text="Radio One", font=(
                    "Arial", 25), justify='center')
            elif frequency == 103.1:
                freq_label.config(text="Satara FM", font=(
                    "Arial", 25), justify='center')
            elif frequency == 101.1:
                freq_label.config(text="Vividh Bharati", font=(
                    "Arial", 25), justify='center')
            else:
                freq_label.config(text="Unknown Channel", font=("Arial", 25))

            frequency = str(frequency)
            frequency_label.config(text=frequency+"Mhz")
            urlfinal = "http://"+ip+"/"+frequency

            try:
                requests.request("GET", urlfinal)
            except requests.ConnectionError:
                pass

        else:
            frequencyslider.config(state="disabled")
            ipentry.delete(0, END)
            ipentry.insert(0, "Please Enter Valid IP Address Here!")
            window.after(2000, reset)
    except NameError:
        frequencyslider.config(state="disabled")
        ipentry.delete(0, END)
        ipentry.insert(0, "Please Enter Valid IP Address Here!")
        window.after(2000, reset)


def reset():
    ipentry.delete(0, END)
    ipentry.insert(0, "Enter IP Address Here !")
    frequencyslider.set(88.0)
    frequencyslider.config(state="disabled")
    frequency_label.config(text="")
    freq_label.config(text="")


def freq_inc():
    frequencyslider.set(frequencyslider.get()+0.1)
    frequency_set(0)


def freq_dec():
    frequencyslider.set(frequencyslider.get()-0.1)
    frequency_set(0)


def errormsg():
    frequencyslider.config(state="disabled")
    frequency_label.config(text="")
    freq_label.config(text="")
    ipentry.delete(0, END)
    ipentry.insert(0, "Something Went Wrong")
    window.after(10000, reset)


def click(*args):
    ipentry.delete(0, END)


# Window
window = ttk.Window(themename="darkly")
window.title("IOT BASED FM RADIO GUI")
window.geometry('800x650')
window.resizable(False, False)


# Entry for IP address
ipentry = ttk.Entry(window, width=120, justify="center")
ipentry.insert(0, 'Enter IP Address Here !')
ipentry.pack(pady=10)

# Connect Button
connect_button = ttk.Button(window, text="Connect",
                            width=50, bootstyle="success", padding=10, command=connect)
connect_button.place(x=35, y=55,)

# Reset Button
reset_button = ttk.Button(window, text="Reset", width=50,
                          bootstyle="danger", padding=10, command=reset)
reset_button.place(x=440, y=55)

# Channel Frame
channel_frame = ttk.Labelframe(
    window, text="Channel", labelanchor='n', bootstyle="info", borderwidth=20)
channel_frame.pack(pady=50)

# Image Background
frequencyframe = ttk.Frame(
    channel_frame, borderwidth="15", bootstyle="secondary")
frequencyframe.pack(ipady=150, ipadx=325)

# Frquency Label
freq_label = ttk.Label(frequencyframe, bootstyle="inverse-secondary")
freq_label.pack(side=BOTTOM)

# Frequency Label
frequency_label = ttk.Label(frequencyframe, text="", font=(
    "Arial", 85), bootstyle="inverse-secondary")
frequency_label.place(x=175, y=100)

# Slider Label
f_label = ttk.Label(window, text="Frequency Slider", font=(
    "Arial", 10))
f_label.pack()

# Frequency Scale
frequencyslider = ttk.Scale(
    window, from_=88, to=108, orient=HORIZONTAL, length=712, bootstyle="info", command=frequency_set)
frequencyslider.pack()

# Key Bindinds
ipentry.bind('<Button-1>', click)
window.bind('<Right>', lambda event: freq_inc())
window.bind('<Left>', lambda event: freq_dec())

window.mainloop()
