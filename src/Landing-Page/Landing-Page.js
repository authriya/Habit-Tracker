import React from 'react';
import './Landing-Page.css'

class LandingPage extends React.Component {
    render() {
        return(
            <div className="Landing_Page">
                    <h2 className="subheading">An app that confirms that you are, in fact, still adulting</h2>
                    <p className="app_summary">This quarantine's pretty stressful, to say the least. It's hard to maintain some semblance of normalcy while still being gentle with yourself. It's hard to strike that balance between being productive and not putting too much pressure on yourself as you're coping with an unprecedented world event.</p>
                    <p className= "app_summary">I created the Habit Tracker with this balance in mind– I wanted to create an app that lets you set tasks that you ideally want to do every day– but doesn't pressure you to do them at any particular time. Here's how it works– add a task (or two, or three), and then everyday that you perform that task,log it in the tracker. You can view your progress in the "Habits Progress" tab that shows how you did over the course of a week. Didn't do so hot? That's ok, with every new week, you get a fresh new slate to do better! The timespan of a week to track your habits is the ideal middle ground between taking it one day at a time, and giving yourself a flexible routine. </p>
                    <p className= "app_summary"> Start off by adding a habit on the "Add a Habit" tab, and then log your progress everyday under the "Track Habits" tab. See a graph of your habits progress in the "Habits Progress" tab. To see a summary of the habits you're tracking, what day you're on in the week, or to refresh to a new week go to the "Overview" tab.</p>
                    <p className= "app_summary">Have fun tracking, and stay healthy, safe, and happy!</p>
            </div>
        )
    }
}

export default LandingPage
