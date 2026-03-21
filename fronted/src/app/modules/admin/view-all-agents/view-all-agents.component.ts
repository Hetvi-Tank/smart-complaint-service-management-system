import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-agents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-all-agents.component.html',
  styleUrls: ['./view-all-agents.component.css']
})
export class ViewAllAgentsComponent implements OnInit {

  agents: any[] = [];
  selectedAgent: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAgents();
  }

  // ✅ LOAD AGENTS
  getAgents() {
    this.http.get<any[]>('http://localhost:5000/api/agents/all')
      .subscribe({
        next: (res) => {

          this.agents = res.map(a => ({
            ...a,
            isAssigned: a.assignedTo ? true : false
          }));

        },
        error: () => {
          alert("Failed to load agents");
        }
      });
  }

  // ✅ EDIT
  editAgent(agent: any) {

    if (agent.isAssigned) {
      alert("Agent is already assigned, cannot edit");
      return;
    }

    this.selectedAgent = { ...agent };
  }

  // ❌ CANCEL
  cancelEdit() {
    this.selectedAgent = null;
  }

  // ✅ UPDATE (ERROR HANDLED)
  updateAgent() {

    this.http.put(
      `http://localhost:5000/api/admin/update-agent/${this.selectedAgent._id}`,
      this.selectedAgent
    ).subscribe({

      next: () => {

        alert("Agent Updated Successfully");

        this.selectedAgent = null;
        this.getAgents();

      },

      error: (err) => {

        // 🔥 CLEAN MESSAGE (NO RED ERROR CONFUSION)
        if (err.error?.message) {
          alert(err.error.message);
        } else {
          alert("Unable to update agent");
        }

        this.selectedAgent = null;

      }

    });

  }

  // ✅ DELETE (ERROR HANDLED)
  deleteAgent(id: any) {

    const agent = this.agents.find(a => a._id === id);

    if (agent.isAssigned) {
      alert("Agent is assigned to complaints, cannot delete");
      return;
    }

    if (!confirm("Are you sure you want to delete this agent?")) return;

    this.http.delete(`http://localhost:5000/api/admin/delete-agent/${id}`)
      .subscribe({

        next: () => {

          alert("Agent Deleted Successfully");
          this.getAgents();

        },

        error: (err) => {

          if (err.error?.message) {
            alert(err.error.message);
          } else {
            alert("Unable to delete agent");
          }

        }

      });

  }

}