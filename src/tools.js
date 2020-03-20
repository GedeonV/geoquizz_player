export const tools = {
	methods : {
		getMembers(id){
			let members = this.$store.state.members;
			for (let i=0; i<members.length; i++){
				if(members[i].id == id){
					return members[i]
				}
			}
		},
		getMemberName(id){
			let member = this.getMembers(id);
			if(member) {
				return member.fullname;
			}
		},
		getMemberEmail(id){
			let member = this.getMembers(id);
			if(member) {
				return member.email;
			}
		}

	}
}